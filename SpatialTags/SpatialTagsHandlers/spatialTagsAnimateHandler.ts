import {ISpatialTagsConfig, ISpatialTag} from "../spatialTagsInterfaces";
import {SpatialTagsGenerateHandler} from "./spatialTagsGenerateHandler";

export class SpatialTagsAnimateHandler {
  spatialTagsContainer: HTMLElement | null;
  spatialTagsConfig: ISpatialTagsConfig;
  animationFrameID: number | null = null;
  radius: number;
  diameter: number;

  _lastRotationX: number;
  _lastRotationY: number;
  _lastAnimateUpdateTime: number = 0;
  _animateFrameInterval: number = 15;
  _lastInteractionUpdateTime: number = 0;
  _interactionFrameInterval: number = 50;

  spatialTagsGenerateHandler: SpatialTagsGenerateHandler;

  constructor(spatialTagsConfig: ISpatialTagsConfig, spatialTagsContainer: HTMLElement | null = null, spatialTagsGenerateHandler: SpatialTagsGenerateHandler) {
    this.spatialTagsContainer = spatialTagsContainer;
    this.spatialTagsConfig = spatialTagsConfig;
    this.radius = this.spatialTagsConfig.tagConfig.radius;
    this.diameter = this.radius * 2;
    this._lastRotationX = this.spatialTagsConfig.tagConfig.speed / 100 * (Math.random() * 2 - 1);
    this._lastRotationY = this.spatialTagsConfig.tagConfig.speed / 100 * (Math.random() * 2 - 1);

    this.spatialTagsGenerateHandler = spatialTagsGenerateHandler;
  }

  destroy() {
    if (this.animationFrameID !== null) {
      cancelAnimationFrame(this.animationFrameID);
      this.animationFrameID = null;
    }

    this.lastAnimateUpdateTime = 0;
    this.lastInteractionUpdateTime = 0;
  }

  // Method to start the animation loop
  startAnimation() {
    if (!this.animationFrameID) {
      this.animationFrameID = requestAnimationFrame(this.animateTags.bind(this));
    }
  }

  animateTags(timestamp: number) {
    if (!this.spatialTagsConfig.tagConfig.rotateOnLoad) {
      return
    }

    if (timestamp - this.lastAnimateUpdateTime > this.animateFrameInterval) {
      this.lastAnimateUpdateTime = timestamp;

      let rotation = {
        sinRotationX: Math.sin(this.lastRotationX),
        cosRotationX: Math.cos(this.lastRotationX),
        sinRotationY: Math.sin(this.lastRotationY),
        cosRotationY: Math.cos(this.lastRotationY)
      };

      this.spatialTagsGenerateHandler.spatialTags.forEach(tag => {
        let rotationX: number = tag.x * rotation.cosRotationX + tag.z * -rotation.sinRotationX;
        let rotationY: number = tag.y;
        let rotationZ: number = tag.x * rotation.sinRotationX + tag.z * rotation.cosRotationX;

        tag.x = rotationX;
        tag.y = rotationY * rotation.cosRotationY + rotationZ * -rotation.sinRotationY;
        tag.z = rotationY * rotation.sinRotationY + rotationZ * rotation.cosRotationY;

        let elementSize = this.calculateTagPositioningFromSize(this.spatialTagsConfig.tagConfig.sizing!.textSizeMultiplier!);
        let per = this.diameter / (this.diameter + tag.z);
        let scale = per / 1.5; // Adjust the scaling factor
        let blur = (1 - per) * 5; // Adjust the blur factor

        tag.element!.style.transform = `translate3d(${(tag.x * per - elementSize.width / this.radius)}px, ${(tag.y * per - elementSize.height / this.radius)}px, 0) scale(${scale})`;
        tag.element!.style.opacity = per.toString();
        tag.element!.style.filter = `blur(${blur}px)`;
        tag.element!.style.zIndex = Math.round(-tag.z).toString();
      });
    }

    this.animationFrameID = requestAnimationFrame(this.animateTags.bind(this));
  }

  calculateTagPositioningFromSize(fontSize: number) {
    // Define the relationship between font size and element dimensions
    const widthFactor = -4;
    const heightFactor = -5;

    return {
      width: fontSize * widthFactor,
      height: fontSize * heightFactor
    };
  }


  startContentTransition() {
    this.spatialTagsGenerateHandler.spatialTags.forEach(tag => {
      if (tag.tagContent.shouldCycleItems) {
        this.setupContentTransition(tag);
      }
    });
  }

  setupContentTransition(tag: ISpatialTag) {
    const switchContent = () => {
      this.transitionContent(tag.element!, tag.currentCycleIndex);
      tag.currentCycleIndex = (tag.currentCycleIndex + 1) % tag.element!.children.length;

      const nextSwitchInterval = 5000 + Math.random() * 10000; // 5 to 15 seconds
      setTimeout(switchContent, nextSwitchInterval);
    };

    const initialDelay = 5000 + Math.random() * 20000; // 5 to 25 seconds
    setTimeout(switchContent, initialDelay);
  }

  transitionContent(container: HTMLElement, currentIndex: number) {
    const totalElements = container.children.length;
    const nextIndex = (currentIndex + 1) % totalElements;

    // Get current and next child elements
    const currentElement = container.children[currentIndex] as HTMLElement;
    const nextElement = container.children[nextIndex] as HTMLElement;

    // Animate the current element to shrink it down
    currentElement.style.transition = 'transform 0.5s ease-out';
    currentElement.style.transform = 'scale(0)';

    setTimeout(() => {
      currentElement.style.display = 'none';

      // Prepare the next element
      nextElement.style.display = 'block';
      nextElement.style.transform = 'scale(0)';
      nextElement.style.transition = 'transform 0.5s ease-in-out';

      // Delay the transformation slightly to ensure it renders
      setTimeout(() => {
        nextElement.style.transform = 'scale(1.1)'; // Grow slightly larger
      }, 50); // Short delay

      setTimeout(() => {
        nextElement.style.transform = 'scale(1)'; // Then shrink back to original size
      }, 550); // Delay should be the sum of the initial delay and half of the transition duration
    }, 500); // The timeout should match the transition duration
  }


  // Getters and Setters
  public get lastRotationX(): number {
    return this._lastRotationX;
  }

  public set lastRotationX(value: number) {
    this._lastRotationX = value;
  }

  public get lastRotationY(): number {
    return this._lastRotationY;
  }

  public set lastRotationY(value: number) {
    this._lastRotationY = value;
  }

  public get lastAnimateUpdateTime(): number {
    return this._lastAnimateUpdateTime;
  }

  public set lastAnimateUpdateTime(value: number) {
    this._lastAnimateUpdateTime = value;
  }

  public get animateFrameInterval(): number {
    return this._animateFrameInterval;
  }

  public set animateFrameInterval(value: number) {
    this._animateFrameInterval = value;
  }

  public get lastInteractionUpdateTime(): number {
    return this._lastInteractionUpdateTime;
  }

  public set lastInteractionUpdateTime(value: number) {
    this._lastInteractionUpdateTime = value;
  }

  public get interactionFrameInterval(): number {
    return this._interactionFrameInterval;
  }

  public set interactionFrameInterval(value: number) {
    this._interactionFrameInterval = value;
  }
}
