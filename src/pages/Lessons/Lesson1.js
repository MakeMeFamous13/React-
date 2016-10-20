'use strict';

import LessonBase from './LessonBase';

import Start from './Lesson1/_Start.jsx';
import End from './Lesson1/_End.jsx';

import lesson_1_Beginning_1 from './Lesson1/lesson_1_Beginning_1.jsx';
import lesson_1_football_1 from './Lesson1/lesson_1_football_1.jsx';
import lesson_1_Boxing_1 from './Lesson1/lesson_1_Boxing_1.jsx';
import lesson_1_Playground_1 from './Lesson1/lesson_1_Playground_1.jsx';
import lesson_1_garden_1 from './Lesson1/lesson_1_garden_1.jsx';
import lesson_1_map_1 from './Lesson1/lesson_1_map_1.jsx';

import lesson_1_Table_1 from './Lesson1/lesson_1_Table_1.jsx';
import lesson_1_garden_2 from './Lesson1/lesson_1_garden_2.jsx';
import lesson_1_house_1 from './Lesson1/lesson_1_house_1.jsx';
import lesson_1_fabric_1 from './Lesson1/lesson_1_fabric_1.jsx';

import lesson_1_Square_1 from './Lesson1/lesson_1_Square_1.jsx';
import lesson_1_Rectangle_1 from './Lesson1/lesson_1_Rectangle_1.jsx';
import lesson_1_Round_1 from './Lesson1/lesson_1_Round_1.jsx';
import lesson_1_Polygon_1 from './Lesson1/lesson_1_Polygon_1.jsx';
import lesson_1_Triangle_1 from './Lesson1/lesson_1_Triangle_1.jsx';
import lesson_1_Pentagon_1 from './Lesson1/lesson_1_Pentagon_1.jsx';

import lesson_1_comparison_2 from './Lesson1/lesson_1_comparison_2.jsx';
import lesson_1_comparison_1 from './Lesson1/lesson_1_comparison_1.jsx';

import lesson_1_P_1 from './Lesson1/lesson_1_P_1.jsx';
import lesson_1_S_1 from './Lesson1/lesson_1_S_1.jsx';

export default new LessonBase([
    { page: Start },

    {
        page: lesson_1_Beginning_1,
        resources: [
            {
                animationFile: '/canvas/lesson_1_Beginning_1.js',
                jsonFile: '/canvas/images/lesson_1_Beginning_1_atlas_.json?1468258200920',
                canvasId: 'lesson_1_Beginning_1_atlas_',
                animationFunction: 'lesson_1_Beginning_1'
            }
        ]
    },

    {
        nav: 'VERTICAL',
        pages: [
            {
                page: lesson_1_football_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_football_1.js',
                        jsonFile: '/canvas/images/lesson_1_football_1_atlas_.json?1468229938022',
                        canvasId: 'lesson_1_football_1_atlas_',
                        animationFunction: 'lesson_1_football_1'
                    }
                ]
            },

            {
                page: lesson_1_Boxing_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Boxing_1.js',
                        jsonFile: '/canvas/images/lesson_1_Boxing_1_atlas_.json?1468229785888',
                        canvasId: 'lesson_1_Boxing_1_atlas_',
                        animationFunction: 'lesson_1_Boxing_1'
                    }
                ]
            },

            {
                page: lesson_1_Playground_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Playground_1.js',
                        jsonFile: '/canvas/images/lesson_1_Playground_1_atlas_.json?1468231127234',
                        canvasId: 'lesson_1_Playground_1_atlas_',
                        animationFunction: 'lesson_1_Playground_1'
                    }
                ]
            },

            {
                page: lesson_1_garden_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_garden_1.js',
                        jsonFile: '/canvas/images/lesson_1_garden_1_atlas_.json?1468253984825',
                        canvasId: 'lesson_1_garden_1_atlas_',
                        animationFunction: 'lesson_1_garden_1'
                    }
                ]
            },

            {
                page: lesson_1_map_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_map_1.js',
                        jsonFile: '/canvas/images/lesson_1_map_1_atlas_.json?1468253332481',
                        canvasId: 'lesson_1_map_1_atlas_',
                        animationFunction: 'lesson_1_map_1'
                    }
                ]
            },
        ]
    },

    {
        nav: 'VERTICAL',
        pages: [
            {
                page: lesson_1_Table_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Table_1.js',
                        jsonFile: '/canvas/images/lesson_1_Table_1_atlas_.json?1468193799552',
                        canvasId: 'lesson_1_Table_1_atlas_',
                        animationFunction: 'lesson_1_Table_1'
                    }
                ]
            },

            {
                page: lesson_1_garden_2,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_garden_2.js',
                        jsonFile: '/canvas/images/lesson_1_garden_2_atlas_.json?1468255207429',
                        canvasId: 'lesson_1_garden_2_atlas_',
                        animationFunction: 'lesson_1_garden_2'
                    }
                ]
            },

            {
                page: lesson_1_house_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_house_1.js',
                        jsonFile: '/canvas/images/lesson_1_house_1_atlas_.json?1468255358054',
                        canvasId: 'lesson_1_house_1_atlas_',
                        animationFunction: 'lesson_1_house_1'
                    }
                ]
            },

            {
                page: lesson_1_fabric_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_fabric_1.js',
                        jsonFile: '/canvas/images/lesson_1_fabric_1_atlas_.json?1468259560983',
                        canvasId: 'lesson_1_fabric_1_atlas_',
                        animationFunction: 'lesson_1_fabric_1'
                    }
                ]
            },
        ]
    },

    {
        pages: [
            {
                page: lesson_1_Square_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Square_1.js',
                        animationFunction: 'lesson_1_Square_1'
                    }
                ]
            },

            {
                page: lesson_1_Rectangle_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Rectangle_1.js',
                        animationFunction: 'lesson_1_Rectangle_1'
                    }
                ]
            },

            {
                page: lesson_1_Round_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Round_1.js',
                        animationFunction: 'lesson_1_Round_1'
                    }
                ]
            },

            {
                page: lesson_1_Triangle_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Triangle_1.js',
                        animationFunction: 'lesson_1_Triangle_1'
                    }
                ]
            },

            {
                page: lesson_1_Polygon_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Polygon_1.js',
                        animationFunction: 'lesson_1_Polygon_1'
                    }
                ]
            },

            {
                page: lesson_1_Pentagon_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_Pentagon_1.js',
                        animationFunction: 'lesson_1_Pentagon_1'
                    }
                ]
            },
        ]
    },

    {
        pages: [
            {
                page: lesson_1_comparison_2,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_comparison_2.js',
                        jsonFile: '/canvas/images/lesson_1_comparison_2_atlas_.json?1468258200920',
                        canvasId: 'lesson_1_comparison_2_atlas_',
                        animationFunction: 'lesson_1_comparison_2'
                    }
                ]
            },

            {
                page: lesson_1_comparison_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_comparison_1.js',
                        jsonFile: '/canvas/images/lesson_1_comparison_1_atlas_.json?1468258200920',
                        canvasId: 'lesson_1_comparison_1_atlas_',
                        animationFunction: 'lesson_1_comparison_1'
                    }
                ]
            },
        ]
    },

    {
        nav: 'VERTICAL',
        pages: [
            {
                page: lesson_1_P_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_P_1.js',
                        jsonFile: '/canvas/images/lesson_1_P_1_atlas_.json?1468258200920',
                        canvasId: 'lesson_1_P_1_atlas_',
                        animationFunction: 'lesson_1_P_1'
                    }
                ]
            },

            {
                page: lesson_1_S_1,
                resources: [
                    {
                        animationFile: '/canvas/lesson_1_S_1.js',
                        jsonFile: '/canvas/images/lesson_1_S_1_atlas_.json?1468258200920',
                        canvasId: 'lesson_1_S_1_atlas_',
                        animationFunction: 'lesson_1_S_1'
                    }
                ]
            },
        ]
    },

    { page: End },
]);