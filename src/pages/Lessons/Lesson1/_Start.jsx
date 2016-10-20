'use strict';

import React from 'react';
import LessonPageBase from '../LessonPageBase.jsx';

export default class Start extends LessonPageBase {
    componentDidMount() {
        //var lessonCircleMain = this.refs["circle-lesson"];
        //var lessonIconMain = this.refs["icon-lesson-main"];
        var lessonHeader = this.refs["lesson-intro__header"];
        var lessonDivider = this.refs["lesson-intro__divider"];
        var lessonSubject = this.refs["lesson-intro__subject"];
        // var lessonWrapper = $(".wrapper-lesson");

        var tlLessonMain = new TimelineLite();
        tlLessonMain
        //.from(lessonCircleMain, 1, {opacity:0, scale:1.2, ease:Linear.easeNone})
        //.from(lessonIconMain, 1, {opacity:0.5, scale:0.5, ease:Linear.easeNone}, 0)
        .from(lessonHeader, 1, {opacity:0, scale:0.7, ease:Linear.easeNone}, 0.2)
        .from(lessonDivider, 1, {opacity:0, scale:0.7, ease:Linear.easeNone}, 0.2)
        .from(lessonSubject, 1, {opacity:0, scale:0.7, ease:Linear.easeNone}, 0.7);
        //.to(lessonIconMain, 1.2, {scale:1.2, repeat:4, yoyo:true, ease:Linear.easeNone}, 1)
        //.to([lessonCircleMain, lessonHeader, lessonDivider, lessonSubject], 1, {opacity:0});
    }

    render() {
        return <div className="wrapper-lesson wrapper-lesson--geometry">
            <div className="wrapper__lesson-intro">
                <div className="lesson-intro__header" ref="lesson-intro__header">Урок 1</div>
                <div className="lesson-intro__divider" ref="lesson-intro__divider"></div>
                <div className="lesson-intro__subject" ref="lesson-intro__subject">
                    Ознайомлення з поняттям «Площа фігури».<br/>
                    Порівняння об’єктів за площею.
                </div>
            </div>
        </div>;
    }
}