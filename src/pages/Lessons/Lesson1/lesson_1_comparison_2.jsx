'use strict';

import React from 'react';
import LessonPageBase from '../LessonPageBase.jsx';
import CanvasPlayer from '../../LessonViewer/CanvasPlayer.jsx';

export default class extends LessonPageBase {
    render() {
        return <div className="wrapper-lesson wrapper-lesson--geometry">
            <div className="wrapper__screen-left wrapper__screen-left--full2">
                <div className="canvas-block" style={{ backgroundImage: 'url(/upload/lessons/lesson1/lesson_1_comparison_20001.png)' }}>
                    <CanvasPlayer width="632" height="642" resource={this.props.resources[0]} />
                </div>

                <div className="canvas-block" style={{textAlign: 'center'}}>
                    <img src="/upload/lessons/lesson1/lesson_1_comparison_10001.png" />
                </div>
            </div>
        </div>;
    }
}