import {ISpatialTagsConfig} from "./spatialTagsInterfaces";
import {SpatialTagLayouts} from "./spatialTagsEnums";
import {SpatialTags} from "./spatialTags";

export class SpatialTagConfigurations {
  constructor() {
  }

  createHomeSpatialTags(): ISpatialTagsConfig {
    return this.HomeSpatialTags;
  }

  HomeSpatialTags: ISpatialTagsConfig = {
    spatialContainer: {
      style: {
        size: {
          width: '100px',
          height: '100px',
        },
        // position: {
        //   position: 'fixed',
        //   top: '50%',
        //   left: '50%',
        // },
        general: {
          border: '1px solid white',
          margin: '10px auto'
        },
      }
    },
    tagConfig: {
      layoutType: SpatialTagLayouts.SPHERE,
      radius: 150,
      rotateOnLoad: true,
      rotateSensitivity: 1,
      speed: 1,
      sizing: {
        textSizeMultiplier: 13,
        emojiSizeMultiplier: 12,
        imageSizeMultiplier: 22,
        shapeSizeMultiplier: 8,
      }
    },
    tagContent: [
      // { emojiContent:"😀",textContent: 'JavaScript', imageContent: './assets/spatialTagsLogos/javascript.png',  shapeContent: { type: 'polygon', sidesCount: 8}, shouldCycleItems: true, randomStart:false },
      {textContent: 'JavaScript', imageContent: './assets/spatialTagsLogos/javascript.png', shouldCycleItems: true},
      {textContent: 'CSS', imageContent: './assets/spatialTagsLogos/css.png', shouldCycleItems: true},
      {textContent: 'HTML', imageContent: './assets/spatialTagsLogos/html.png', shouldCycleItems: true},
      {textContent: 'C', imageContent: './assets/spatialTagsLogos/c.png', shouldCycleItems: true},
      {textContent: 'C++', imageContent: './assets/spatialTagsLogos/c++.png', shouldCycleItems: true},
      {
        textContent: 'Angular',
        imageContent: './assets/spatialTagsLogos/angular_gradient.png',
        shouldCycleItems: true
      },
      {textContent: 'React', imageContent: './assets/spatialTagsLogos/react.png', shouldCycleItems: true},
      {textContent: 'Python', imageContent: './assets/spatialTagsLogos/python.png', shouldCycleItems: true},
      {textContent: 'Java', imageContent: './assets/spatialTagsLogos/java.png', shouldCycleItems: true},
      {textContent: 'git', imageContent: './assets/spatialTagsLogos/git.png', shouldCycleItems: true},
      {textContent: 'Node.js', imageContent: './assets/spatialTagsLogos/nodejs.png', shouldCycleItems: true},
      {textContent: 'MySQL', imageContent: './assets/spatialTagsLogos/mysql.png', shouldCycleItems: true},
      {textContent: 'Docker', imageContent: './assets/spatialTagsLogos/docker.png', shouldCycleItems: true},
      {textContent: 'TailWind', imageContent: './assets/spatialTagsLogos/tailwind.png', shouldCycleItems: true},
      {textContent: 'TypeScript', imageContent: './assets/spatialTagsLogos/typescript.png', shouldCycleItems: true},
      {textContent: 'C#', imageContent: './assets/spatialTagsLogos/c-sharp.png', shouldCycleItems: true},
      {textContent: 'Dart', imageContent: './assets/spatialTagsLogos/dart.png', shouldCycleItems: true},
      {textContent: 'Flutter', imageContent: './assets/spatialTagsLogos/flutter.png', shouldCycleItems: true},
      {textContent: 'Kotlin', imageContent: './assets/spatialTagsLogos/kotlin.png', shouldCycleItems: true},
      {textContent: 'TensorFlow', imageContent: './assets/spatialTagsLogos/tensorflow.png', shouldCycleItems: true},
      {
        textContent: 'Scikit-Learn',
        imageContent: './assets/spatialTagsLogos/scikit-learn.png',
        shouldCycleItems: true
      },
      {textContent: 'PyTorch', imageContent: './assets/spatialTagsLogos/pytorch.png', shouldCycleItems: true},
    ],
    spatialResponsiveConfig: {
      enabled: true,
      breakpoints: [
        {
          minWidth: 0,
          maxWidth: 320,
          config: {
            spatialContainer: {
              style: {
                size: {
                  width: '250px',
                  height: '250px',
                },
                general: {
                  // border: '1px solid white',
                  margin: '10px auto'
                },
              }
            },
            tagConfig: {
              layoutType: SpatialTagLayouts.SPHERE,
              radius: 100,
              rotateOnLoad: true,
              rotateSensitivity: 1,
              speed: 1,
              sizing: {
                textSizeMultiplier: 13,
                emojiSizeMultiplier: 12,
                imageSizeMultiplier: 22,
                shapeSizeMultiplier: 8,
              }
            },
          },
        },
        {
          minWidth: 321,
          maxWidth: 399,
          config: {
            spatialContainer: {
              style: {
                size: {
                  width: '300px',
                  height: '300px',
                },
                general: {
                  // border: '1px solid white',
                  margin: '10px auto'
                },
              }
            },
            tagConfig: {
              layoutType: SpatialTagLayouts.SPHERE,
              radius: 125,
              rotateOnLoad: true,
              rotateSensitivity: 1,
              speed: 1,
              sizing: {
                textSizeMultiplier: 13,
                emojiSizeMultiplier: 12,
                imageSizeMultiplier: 22,
                shapeSizeMultiplier: 8,
              }
            },
          },
        },
        {
          minWidth: 400,
          maxWidth: 768,
          config: {
            spatialContainer: {
              style: {
                size: {
                  width: '300px',
                  height: '300px',
                },
                general: {
                  // border: '1px solid white',
                  margin: '15px auto'
                },
              }
            },
            tagConfig: {
              layoutType: SpatialTagLayouts.SPHERE,
              radius: 125,
              rotateOnLoad: true,
              rotateSensitivity: 1,
              speed: 1,
              sizing: {
                textSizeMultiplier: 13,
                emojiSizeMultiplier: 12,
                imageSizeMultiplier: 22,
                shapeSizeMultiplier: 8,
              }
            },
          },
        },
        {
          minWidth: 769,
          maxWidth: 1024,
          config: {
            spatialContainer: {
              style: {
                size: {
                  width: '400px',
                  height: '400px',
                },
                general: {
                  // border: '1px solid white',
                  margin: '-15px auto'
                },
              }
            },
            tagConfig: {
              layoutType: SpatialTagLayouts.SPHERE,
              radius: 150,
              rotateOnLoad: true,
              rotateSensitivity: 1,
              speed: 1,
              sizing: {
                textSizeMultiplier: 13,
                emojiSizeMultiplier: 12,
                imageSizeMultiplier: 22,
                shapeSizeMultiplier: 8,
              }
            },
          },
        },
        {
          minWidth: 1025,
          maxWidth: 1440,
          config: {
            spatialContainer: {
              style: {
                size: {
                  width: '300px',
                  height: '300px',
                },
                general: {
                  // border: '1px solid white',
                  margin: '35px auto'
                },
              }
            },
            tagConfig: {
              layoutType: SpatialTagLayouts.SPHERE,
              radius: 125,
              rotateOnLoad: true,
              rotateSensitivity: 1,
              speed: 1,
              sizing: {
                textSizeMultiplier: 13,
                emojiSizeMultiplier: 12,
                imageSizeMultiplier: 22,
                shapeSizeMultiplier: 8,
              }
            },
          },
        },
        {
          minWidth: 1441,
          maxWidth: 2560,
          config: {
            spatialContainer: {
              style: {
                size: {
                  width: '300px',
                  height: '300px',
                },
                general: {
                  // border: '1px solid white',
                  margin: '10px auto'
                },
              }
            },
            tagConfig: {
              layoutType: SpatialTagLayouts.SPHERE,
              radius: 135,
              rotateOnLoad: true,
              rotateSensitivity: 1,
              speed: 1,
              sizing: {
                textSizeMultiplier: 13,
                emojiSizeMultiplier: 12,
                imageSizeMultiplier: 22,
                shapeSizeMultiplier: 8,
              }
            },
          },
        },
      ]
    }
  }
}

