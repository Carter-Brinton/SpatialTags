import { ISpatialTagsConfig, ISpatialTag } from "../spatialTagsInterfaces";
import { SpatialTagsAnimateHandler } from "./spatialTagsAnimateHandler";

export class SpatialTagsInteractionHandler {
    spatialTagsConfig: ISpatialTagsConfig;
    spatialTagsContainer: HTMLElement | null;
    spatialTagsAnimateHandler: SpatialTagsAnimateHandler;

    mouseOver: boolean = false;

    constructor(spatialTagsConfig: ISpatialTagsConfig, spatialTagsContainer: HTMLElement | null = null, spatialTagsAnimateHandler: SpatialTagsAnimateHandler) {
        this.spatialTagsConfig = spatialTagsConfig;
        this.spatialTagsContainer = spatialTagsContainer;
        this.spatialTagsAnimateHandler = spatialTagsAnimateHandler;
    }

    destroy() {
        if (this.spatialTagsContainer) {
            this.spatialTagsContainer.innerHTML = '';
        }

        this.destroyEvents();
    }

    // Init event listeners
    initEvents() {
        this.spatialTagsContainer!.addEventListener('mousemove', this.handleMouseMove);
        this.spatialTagsContainer!.addEventListener('mouseenter', this.handleMouseEnter);
        this.spatialTagsContainer!.addEventListener('mouseleave', this.handleMouseLeave);
        this.spatialTagsContainer!.addEventListener('touchmove', this.handleTouchMove);
        this.spatialTagsContainer!.addEventListener('touchstart', this.handleTouchStart);
        this.spatialTagsContainer!.addEventListener('touchend', this.handleTouchEnd);
    }

    // Destroy event listeners
    destroyEvents() {
        this.spatialTagsContainer!.removeEventListener('mousemove', this.handleMouseMove);
        this.spatialTagsContainer!.removeEventListener('mouseenter', this.handleMouseEnter);
        this.spatialTagsContainer!.removeEventListener('mouseleave', this.handleMouseLeave);
        this.spatialTagsContainer!.removeEventListener('touchmove', this.handleTouchMove);
        this.spatialTagsContainer!.removeEventListener('touchstart', this.handleTouchStart);
        this.spatialTagsContainer!.removeEventListener('touchend', this.handleTouchEnd);
    }

    // Event handler methods
    handleMouseMove = (e: any) => {
        const now: number = Date.now();
        if (now - this.spatialTagsAnimateHandler.lastInteractionUpdateTime > this.spatialTagsAnimateHandler.interactionFrameInterval) {
            this.spatialTagsAnimateHandler.lastInteractionUpdateTime = now;
            const rect = this.spatialTagsContainer!.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            const rotationSensitivity = (this.spatialTagsConfig.tagConfig.rotateSensitivity ?? 1) / 5000;

            this.spatialTagsAnimateHandler.lastRotationX = mouseX * rotationSensitivity;
            this.spatialTagsAnimateHandler.lastRotationY = mouseY * rotationSensitivity;
        }
    };

    handleMouseEnter = () => {
        this.mouseOver = true;

    };

    handleMouseLeave = () => {
        this.mouseOver = false;

    };

    handleTouchMove = (e: TouchEvent) => {
        const now: number = Date.now();
        if (now - this.spatialTagsAnimateHandler.lastInteractionUpdateTime > this.spatialTagsAnimateHandler.interactionFrameInterval) {
            this.spatialTagsAnimateHandler.lastInteractionUpdateTime = now;

            // Get the first touch point (you can handle multiple touches if needed)
            const touch = e.touches[0];

            if (touch) {
                const rect = this.spatialTagsContainer!.getBoundingClientRect();
                const touchX = touch.clientX - rect.left - rect.width / 2;
                const touchY = touch.clientY - rect.top - rect.height / 2;

                const rotationSensitivity = (this.spatialTagsConfig.tagConfig.rotateSensitivity ?? 1) / 5000;

                this.spatialTagsAnimateHandler.lastRotationX = touchX * rotationSensitivity;
                this.spatialTagsAnimateHandler.lastRotationY = touchY * rotationSensitivity;
            }
        }
    };

    handleTouchStart = () => {
        this.mouseOver = true;
    };

    handleTouchEnd = () => {
        this.mouseOver = false;
    };
}