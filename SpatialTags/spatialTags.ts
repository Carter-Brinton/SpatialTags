import {SpatialTagsAnimateHandler} from "./SpatialTagsHandlers/spatialTagsAnimateHandler";
import {SpatialTagsGenerateHandler} from "./SpatialTagsHandlers/spatialTagsGenerateHandler";
import {SpatialTagsInteractionHandler} from "./SpatialTagsHandlers/spatialTagsInteractionHandler";
import {ISpatialTagsConfig, IPosition, ISize} from "./spatialTagsInterfaces";

// TODO Add support for color themes
export class SpatialTags {
  ID: string;
  spatialTagsContainer: HTMLElement | null = null;
  spatialTagsConfig: ISpatialTagsConfig;

  spatialTagsGenerateHandler: SpatialTagsGenerateHandler;
  spatialTagsAnimateHandler: SpatialTagsAnimateHandler;
  spatialTagsInteractionHandler: SpatialTagsInteractionHandler;

  constructor(ID: string, spatialTagsConfig: ISpatialTagsConfig) {
    this.ID = ID;
    this.spatialTagsConfig = spatialTagsConfig;

    this.getResponsiveConfig();
    this.initializeContainer();
    this.spatialTagsGenerateHandler = new SpatialTagsGenerateHandler(this.spatialTagsConfig, this.spatialTagsContainer);
    this.spatialTagsAnimateHandler = new SpatialTagsAnimateHandler(this.spatialTagsConfig, this.spatialTagsContainer, this.spatialTagsGenerateHandler);
    this.spatialTagsGenerateHandler.generateTags();
    this.spatialTagsInteractionHandler = new SpatialTagsInteractionHandler(this.spatialTagsConfig, this.spatialTagsContainer, this.spatialTagsAnimateHandler);
    this.spatialTagsInteractionHandler.initEvents();
    this.spatialTagsAnimateHandler.startAnimation();
    this.spatialTagsAnimateHandler.startContentTransition();
  }

  destroy() {
    this.spatialTagsGenerateHandler.destroy();
    this.spatialTagsAnimateHandler.destroy();
    this.spatialTagsInteractionHandler.destroy();
  }


  // Update the configuration based on the window size
  getResponsiveConfig() {
    if (this.spatialTagsConfig.spatialResponsiveConfig && this.spatialTagsConfig.spatialResponsiveConfig.enabled) {
      const screenWidth = window.innerWidth;
      const applicableSetting = this.spatialTagsConfig.spatialResponsiveConfig.breakpoints.find(setting => {
        return screenWidth >= setting.minWidth && (!setting.maxWidth || screenWidth <= setting.maxWidth);
      });

      if (applicableSetting) {
        this.spatialTagsConfig = {...this.spatialTagsConfig, ...applicableSetting.config};
      }
    }
  }

  initializeContainer(): void {
    this.spatialTagsContainer = document.getElementById(this.ID) as HTMLElement
      || document.querySelector("." + this.ID) as HTMLElement;

    if (!this.spatialTagsContainer) {
      this.spatialTagsContainer = document.createElement('div');
      this.spatialTagsContainer.id = this.ID;
      document.body.appendChild(this.spatialTagsContainer);
    } else {
      this.spatialTagsContainer.id = this.ID;
    }

    this.spatialTagsContainer.style.display = 'flex';
    this.spatialTagsContainer.style.justifyContent = 'center';
    this.spatialTagsContainer.style.alignItems = 'center';
    this.spatialTagsContainer.style.transformStyle = 'preserve-3d';
    this.spatialTagsContainer.style.perspective = '1000px';

    this.adjustContainerSize();

    const spacialContainerStyle = this.spatialTagsConfig.spatialContainer.style;
    if (spacialContainerStyle) {
      // Handle position styles
      if (spacialContainerStyle.position) {
        const positionStyle = spacialContainerStyle.position;
        this.spatialTagsContainer.style.position = positionStyle.position ?? 'relative';
        (['top', 'bottom', 'left', 'right'] as (keyof IPosition)[]).forEach(prop => {
          if (positionStyle[prop] !== undefined) {
            this.spatialTagsContainer!.style[prop] = String(positionStyle[prop as keyof typeof positionStyle]);
          }
        });
      }

      // Handle size styles
      if (spacialContainerStyle.size) {
        const sizeStyle = spacialContainerStyle.size;
        (['width', 'height', 'maxWidth', 'maxHeight'] as (keyof ISize)[]).forEach(prop => {
          if (sizeStyle[prop] !== undefined) {
            this.spatialTagsContainer!.style[prop as any] = String(sizeStyle[prop]);
          }
        });
      }

      // Handle general styles
      if (spacialContainerStyle.general) {
        const generalStyle = spacialContainerStyle.general;
        Object.keys(generalStyle).forEach(key => {
          const value = generalStyle[key as keyof typeof generalStyle];
          if (value !== undefined) {
            this.spatialTagsContainer!.style[key as any] = value;
          }
        });
      }
    }
  }

  adjustContainerSize(): void {
    // Calculate container size based on the sphere's radius
    const radius: number = this.spatialTagsConfig.tagConfig.radius;
    const diameter: number = radius * 2;
    let baseSize: number = diameter; // Set baseSize to the diameter of the sphere

    const viewportFactor: number = Math.min(window.innerWidth, window.innerHeight);
    if (baseSize > viewportFactor) {
      baseSize = viewportFactor * 0.8; // Adjust size to fit within the viewport with some padding
    } else {
      baseSize += 20; // Add some padding to ensure tags don't touch the edges
    }

    this.spatialTagsContainer!.style.width = `${baseSize}px`;
    this.spatialTagsContainer!.style.height = `${baseSize}px`;
  }
}
