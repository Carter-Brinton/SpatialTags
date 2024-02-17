import { ISpatialTagContent, ISpatialTag, ISpatialTagsConfig } from "../spatialTagsInterfaces";

export class SpatialTagsGenerateHandler {
    spatialTagsConfig: ISpatialTagsConfig;
    spatialTagsContainer: HTMLElement | null;
    _spatialTags: ISpatialTag[] = [];
    radius: number;

    constructor(spatialTagsConfig: ISpatialTagsConfig, spatialTagsContainer: HTMLElement | null = null) {
        this.spatialTagsConfig = spatialTagsConfig;
        this.spatialTagsContainer = spatialTagsContainer;
        this.radius = this.spatialTagsConfig.tagConfig.radius;
    }

    destroy() {
        if (this.spatialTagsContainer) {
            this.spatialTagsContainer.innerHTML = '';
        }

        // Reset or nullify other relevant properties
        this.spatialTags = [];
    }

    generateTags() {
        const goldenAngle: number = Math.PI * (3 - Math.sqrt(5));
        const fragment: DocumentFragment = document.createDocumentFragment();

        let tags: ISpatialTagContent[];
        if (Array.isArray(this.spatialTagsConfig.tagContent)) {
            tags = this.spatialTagsConfig.tagContent;
        } else {
            tags = new Array(this.spatialTagsConfig.tagContent.quantity).fill(this.spatialTagsConfig.tagContent.content);
        }

        tags.forEach((tagContent, index) => {
            let tagContainer = document.createElement('div');
            tagContainer.id = `spatialTag_${index}`;
            tagContainer.style.position = 'relative';

            // Create all content types but hide them initially
            this.createAllContents(tagContainer, tagContent, index, tags.length, goldenAngle);

            // Show the first content type
            this.showContentType(tagContainer, tagContent);

            this.spatialTagsContainer!.appendChild(tagContainer);
        });

    }

    createAllContents(tagContainer: HTMLElement, tagContent: ISpatialTagContent, index: number, tagsLength: number, goldenAngle: number) {
        if (tagContent.textContent) {
            const textElement = document.createElement('div');
            textElement.textContent = tagContent.textContent ?? null;
            textElement.className = 'spatialTag-text-content';
            textElement.style.fontSize = (this.spatialTagsConfig.tagConfig?.sizing?.textSizeMultiplier ?? 15) + 'px';
            tagContainer.appendChild(textElement);
        }
        if (tagContent.emojiContent) {
            const emojiElement = document.createElement('div');
            emojiElement.textContent = tagContent.emojiContent ?? null;
            emojiElement.className = 'spatialTag-emoji-content';
            emojiElement.style.fontSize = (this.spatialTagsConfig.tagConfig?.sizing?.emojiSizeMultiplier ?? 15) + 'px';
            tagContainer.appendChild(emojiElement);
        }
        if (tagContent.imageContent) {
            const imgElement = new Image();
            imgElement.src = tagContent.imageContent ?? "";
            imgElement.className = 'spatialTag-img-content';
            imgElement.style.width = (this.spatialTagsConfig.tagConfig?.sizing?.imageSizeMultiplier ?? 15) + 'px';
            imgElement.style.height = (this.spatialTagsConfig.tagConfig?.sizing?.imageSizeMultiplier ?? 15) + 'px';
            tagContainer.appendChild(imgElement);
        }
        if (tagContent.shapeContent) {
            const shapeElement = document.createElement('div');
            shapeElement.className = 'spatialTag-shape-content';
            const shapeSize = this.spatialTagsConfig.tagConfig?.sizing?.shapeSizeMultiplier ?? 50;

            this.createShape(shapeElement, tagContent.shapeContent, shapeSize)
            tagContainer.appendChild(shapeElement);
        }

        // Set Style
        tagContainer!.style.position = 'absolute';
        tagContainer!.style.textAlign = 'center';
        tagContainer!.style.transformOrigin = 'center';
        tagContainer!.style.userSelect = 'none';
        tagContainer!.style.whiteSpace = 'nowrap';

        // Adjust y to evenly distribute words along the sphere's height
        let y = 1 - (index / (tagsLength - 1)) * 2;
        let animationRadius = Math.sqrt(1 - y * y) * this.radius;
        let theta: number = goldenAngle * index;

        const spatialTag: ISpatialTag = {
            ID: `spatialTag_${index}`,
            element: tagContainer,
            tagContent: tagContent,
            x: animationRadius * Math.cos(theta),
            y: animationRadius * Math.sin(theta),
            z: y * this.radius,
            currentCycleIndex: 0
        };

        this.spatialTags.push(spatialTag);
    }

    showContentType(container: HTMLElement, tagContent: ISpatialTagContent) {
        // Hide all children
        Array.from(container.children).forEach(child => {
            if (child instanceof HTMLElement) {
                child.style.display = 'none';
            }
        });

        // Determine which content to show
        let contentToShowIndex = 0; // Default to the first content
        if ((tagContent.randomStart == undefined || tagContent.randomStart) && container.children.length > 0) {
            contentToShowIndex = Math.floor(Math.random() * container.children.length);
        }

        // Show the specified content by index
        const childToShow = container.children[contentToShowIndex];
        if (childToShow && childToShow instanceof HTMLElement) {
            childToShow.style.display = 'block';
        }
    }

    createShape(element: HTMLElement, shapeContent: any, shapeSize: number) {
        // You can handle different shape types here
        if (shapeContent.type === 'circle') {
            this.createCircle(element, `${shapeSize}px`);
        } else if (shapeContent.type === 'triangle') {
            this.createPolygon(element, 3, shapeSize); // 3 sides for a triangle
        } else if (shapeContent.type === 'square') {
            this.createPolygon(element, 4, shapeSize); // 4 sides for a square
        } else if (shapeContent.type === 'polygon') {
            const sides = shapeContent.sidesCount ?? 4;
            this.createPolygon(element, sides, shapeSize);
        } else {
            this.createCircle(element, `${shapeSize}px`); // Default to circle
        }
    }

    // Will need to make sure to implment Color Themeing, since using the border to create circle sometimes causes weird dot in middle of circle
    createCircle(element: HTMLElement, size: string): void {
        element.innerHTML = '';
        element.style.width = size;
        element.style.height = size;
        element.style.border = `${parseInt(size) / 2}px solid`;
        element.style.borderRadius = '50%';
        element.style.position = 'relative';
        element.style.backgroundColor = 'solid';
    }

    createPolygon(container: HTMLElement, sides: number, size: number): void {
        container.innerHTML = '';
        const angle = 360 / sides;

        for (let i = 0; i < sides; i++) {
            const side = document.createElement('div');
            side.style.width = `${size}px`;
            side.style.height = `0`;
            side.style.borderBottom = `${size / 2}px solid`;
            side.style.position = 'absolute';
            side.style.transform = `rotate(${angle * i}deg) translate(0, -50%)`;
            container.appendChild(side);
        }

        container.style.width = `${size}px`;
        container.style.height = `${size}px`;
        container.style.position = 'relative';
    }

    // Getters and Setters
    public get spatialTags(): ISpatialTag[] {
        return this._spatialTags;
    }
    public set spatialTags(value: ISpatialTag[]) {
        this._spatialTags = value;
    }

}


