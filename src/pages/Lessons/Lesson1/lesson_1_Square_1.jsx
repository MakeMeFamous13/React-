'use strict';

import React from 'react';
import LessonPageBase from '../LessonPageBase.jsx';
import CanvasPlayer from '../../LessonViewer/CanvasPlayer.jsx';

export default class extends LessonPageBase {
    render() {
        return <div className="wrapper-lesson wrapper-lesson--geometry">
            <div className="wrapper__screen-left wrapper__screen-left--full6">
                <div className="canvas-block" id="math-lesson-1-square" style={{ backgroundImage: 'url(/img/mat_lesson_1/lesson_1_Square_10001.png)' }}>
                    <CanvasPlayer width="420" height="317" resource={this.props.resources[0]} />
                </div>

                <div className="canvas-block">
                    <img src="/img/mat_lesson_1/lesson_1_Rectangle_10001.png" alt="" className="lesson-img-6"/>
                </div>

                <div className="canvas-block">
                    <img src="/img/mat_lesson_1/lesson_1_Round_10001.png" alt="" className="lesson-img-6"/>
                </div>

                <div className="canvas-block">
                    <img src="/img/mat_lesson_1/lesson_1_Triangle_10001.png" alt="" className="lesson-img-6"/>
                </div>

                <div className="canvas-block">
                    <img src="/img/mat_lesson_1/lesson_1_Polygon_10001.png" alt="" className="lesson-img-6"/>
                </div>

                <div className="canvas-block">
                    <img src="/img/mat_lesson_1/lesson_1_Pentagon_10001.png" alt="" className="lesson-img-6"/>
                </div>
            </div>
        </div>;
    }
}