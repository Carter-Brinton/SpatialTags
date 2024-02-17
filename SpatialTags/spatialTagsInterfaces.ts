import { SpatialTagLayouts, SpatialTagShapes, SpatialTagType } from "./spatialTagsEnums";

export interface ISpatialTagContent {
    textContent?: string;
    emojiContent?: string;
    shapeContent?: SpatialTagShapes;
    imageContent?: string;
    randomStart?: boolean;
    shouldCycleItems?: boolean;
    cycleInterval?: { minSeconds: number, maxSeconds: number };
}

export interface ISpatialTag {
    ID: string;
    element: HTMLElement | null;
    tagContent: ISpatialTagContent;
    x: number;         // X-coordinate in 3D space
    y: number;         // Y-coordinate in 3D space
    z: number;         // Z-coordinate in 3D space
    currentCycleIndex: number;
}

export interface ISpatialTagsConfig {
    spatialContainer: ISpatialContainer;
    tagConfig: ITagConfiguration;
    tagContent: ISpatialTagContent[] | { content: ISpatialTagContent, quantity: number };
    spatialResponsiveConfig: ISpatialTagsResponsiveConfig;
}

export interface ISpatialContainer {
    style?: ISpatialStyle;
}

export interface ISpatialStyle {
    size?: ISize;
    position?: IPosition;
    general?: IGeneralAttributes;
}

export interface IPosition {
    position: 'absolute' | 'fixed' | 'relative' | 'static';
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
}

export interface ISize {
    width: string;
    height: string;
    maxWidth?: string;
    maxHeight?: string;
}

export interface IGeneralAttributes {
    zIndex?: string;
    margin?: string;
    padding?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
    backgroundColor?: string;
    opacity?: string;
    cursor?: 'pointer' | 'default' | 'move' | 'wait';
    visibility?: 'visible' | 'hidden' | 'collapse';
    display?: 'block' | 'inline-block' | 'flex' | 'none';
    overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
    userSelect?: 'none' | 'auto' | 'text' | 'contain' | 'all';
    transform?: string;
    transition?: string;
    filter?: string;
    pointerEvents?: 'auto' | 'none';
}

export interface ITagConfiguration {
    layoutType: SpatialTagLayouts;  // TODO Ability to create different layouts, such as cube, wheel, etc.
    radius: number;
    rotateOnLoad?: boolean;
    rotateSensitivity?: number;
    speed: number;
    velocityFactor?: number; // TODO create velocity factor to slow down or speed up rotation
    sizing?: {
        textSizeMultiplier?: number;
        emojiSizeMultiplier?: number;
        imageSizeMultiplier?: number;
        shapeSizeMultiplier?: number;
    }
}

export interface ISpatialTagsResponsiveConfig {
    enabled: boolean;
    breakpoints: IResponsiveSpatialTagsSetting[];
}

export interface IResponsiveSpatialTagsSetting {
    minWidth: number;
    maxWidth?: number;
    config: Partial<ISpatialTagsConfig>
}
