'use strict';

import React from 'react';
import LessonPageBase from '../LessonPageBase.jsx';
import CanvasPlayer from '../../LessonViewer/CanvasPlayer.jsx';

export default class extends LessonPageBase {
    render() {
        return <div className="wrapper-lesson wrapper-lesson--geometry">
            <div className="wrapper__screen-left wrapper__screen-left--full2-2">
                <div className="canvas-block">
                    <img src="/upload/lessons/lesson1/lesson_1_P_10001.png" />
                </div>

                <div className="canvas-block" style={{ backgroundImage: 'url(/upload/lessons/lesson1/lesson_1_S_10001.png)' }}>
                    <CanvasPlayer width="1270" height="318" resource={this.props.resources[0]} />
                </div>
            </div>
        </div>;
    }
}