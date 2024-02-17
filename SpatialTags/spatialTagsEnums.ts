export enum SpatialTagLayouts {
    SPHERE = 'sphere',
    CUBE = 'cube',
}

export enum SpatialTagType {
    TEXT = 'text',
    EMOJI = 'emoji',
    IMAGE = 'image',
    SHAPE = 'shape',
}

// export enum SpatialTagShapes {
//     CIRCLE = 'circle',
//     TRIANGLE = 'triangle',
//     SQUARE = 'square',
//     POLYGON = "polygon"
// }

// TODO: Use this type reference for some of the particle configuration (particleType and effectType...)
type CIRCLE = { type: 'circle' };
type TRIANGLE = { type: 'triangle' };
type SQUARE = { type: 'square' };
type POLYGON = { type: 'polygon', sidesCount: number };

export type SpatialTagShapes = CIRCLE | TRIANGLE | SQUARE | POLYGON;