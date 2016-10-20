'use strict';

import React from 'react';
import LessonPageBase from '../LessonPageBase.jsx';
import CanvasPlayer from '../../LessonViewer/CanvasPlayer.jsx';

export default class extends LessonPageBase {
    render() {
        return <div className="wrapper-lesson wrapper-lesson--geometry">
            <div className="wrapper__screen-left lesson-02-left">
                <CanvasPlayer width="844" height="642" resource={this.props.resources[0]} />
            </div>
            <div className="wrapper__screen-right">
                <div className="screen-block screen-block__right-side">
                    <div className="icon-circle icon-circle--114 lesson-menu-circle"><img src="/img/4.png" alt="" className="lesson-menu-img"/></div>
                    <div className="screen-block__title lesson-menu-title">Футбольне поле</div>
                </div>
                <div className="screen-block screen-block__right-side">
                    <div className="icon-circle icon-circle--114 lesson-menu-circle"><img src="/img/5.png" alt="" className="lesson-menu-img"/></div>
                    <div className="screen-block__title lesson-menu-title">Ринг</div>
                </div>
                <div className="screen-block screen-block__right-side">
                    <div className="icon-circle icon-circle--114 lesson-menu-circle"><img src="/img/3.png" alt="" className="lesson-menu-img"/></div>
                    <div className="screen-block__title lesson-menu-title">Дитячий майданчик</div>
                </div>
                <div className="screen-block screen-block__right-side screen-block__right-side--active">
                    <div className="icon-circle icon-circle--114 lesson-menu-circle"><img src="/img/2.png" alt="" className="lesson-menu-img"/></div>
                    <div className="screen-block__title lesson-menu-title">Ділянка городу з грядками</div>
                </div>
                <div className="screen-block screen-block__right-side">
                    <div className="icon-circle icon-circle--114 lesson-menu-circle"><img src="/img/1.png" alt="" className="lesson-menu-img"/></div>
                    <div className="screen-block__title lesson-menu-title">Мапа</div>
                </div>
            </div>
        </div>;
    }
}