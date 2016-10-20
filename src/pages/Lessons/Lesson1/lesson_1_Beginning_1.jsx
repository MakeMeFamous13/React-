'use strict';

import React from 'react';
import LessonPageBase from '../LessonPageBase.jsx';
import CanvasPlayer from '../../LessonViewer/CanvasPlayer.jsx';

export default class extends LessonPageBase {
    render() {
        return <div className="wrapper-lesson wrapper-lesson--geometry">
            <div className="wrapper__screen-full">
                <CanvasPlayer width="1270" height="642" resource={this.props.resources[0]} />
            </div>
        </div>;
    }
}