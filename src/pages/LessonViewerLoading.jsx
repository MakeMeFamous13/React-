'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import store from '../store';
import { connect } from 'react-redux';
import _ from 'underscore';
import keyboard from '../keyboardEvents';

import Lesson1 from './Lessons/Lesson1.js';
import Lesson2_5 from './Lessons/Lesson2_5.js';
import Lesson2_9 from './Lessons/Lesson2_9.js';
import Lesson2_10 from './Lessons/Lesson2_10.js';

class LessonViewerLoading extends React.Component {
	constructor(props) {
		super(props);

		this.lessons = {
            lesson1_1: Lesson1,
            lesson2_5: Lesson2_5,
            lesson2_9: Lesson2_9,
            lesson2_10: Lesson2_10
        };
	}

    componentDidMount() {
        // Animation
        var lessonHeader = this.refs['lesson-intro__header'];
        var tlLessonMain = new TimelineLite();
        tlLessonMain.from(lessonHeader, 1, {opacity:0, scale:0.7, ease:Linear.easeNone}, 0.2);

        // Disable keyboard events
        this.keydownEvent = keyboard.keydown();
        this.contextMenuEvent =  keyboard.contextmenu();

        /**
         * Load current lesson
         */
        const subject = _.findWhere(this.props.subjectsList, { id: this.props.subjectsSelected });
        const lesson = _.findWhere(this.props.lessonsList, { id: this.props.lessonsSelected });

        if ( ! subject || ! lesson) {
            // Go back to list
            this.goBack();
            return;
        }

        let lessonId = 'lesson'+ subject.id +'_'+ lesson.id;
        let currentLesson = this.lessons[lessonId];

        if (typeof currentLesson === 'undefined' || ! currentLesson) {
            // Go back to list
            this.goBack();
            return;
        }

        $.getScript('/js/createjs-2015.11.26.min.js', () => {
            currentLesson.load().then(() => {
                // Load lesson screens
                store.dispatch({
                    type: 'LOAD_LESSON',
                    lesson: currentLesson.getPages()
                });

                this.timer = setTimeout(() => {
                    // Go to lesson after 3 seconds
                    var url = '/lesson/subject-:subjectId/class-:classId/lesson-:lessonId';
                    url = url.replace(':subjectId', this.props.params.subjectId)
                    .replace(':classId', this.props.params.classId)
                    .replace(':lessonId', this.props.params.lessonId);

                    routerHistory.push(url + this.props.location.search);
                }, 500);
            });
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.keydownEvent();
        this.contextMenuEvent();
    }

    goBack() {
        var url = '/menu/lessons/subject-:subjectId/class-:classId';
        url = url.replace(':subjectId', this.props.params.subjectId)
        .replace(':classId', this.props.params.classId)
        .replace(':lessonId', this.props.params.lessonId);

        routerHistory.push(url + this.props.location.search);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div className="wrapper-lesson wrapper-lesson--geometry wrapper-lesson--load">
            <div className="wrapper-ico">
                <img src="/img/logo/logo-load.gif" alt=""/>
            </div>
            <div className="lesson-intro__header" ref="lesson-intro__header">Іде завантаження, зачекайте</div>
        </div>;
    }
}

const mapStateToProps = (store, props) => {
    let lessonsList = store.lessons.list[props.params.subjectId];

    if ( !! lessonsList) {
        lessonsList = lessonsList[props.params.classId];
    }

    return {
        subjectsList: store.subjects.list,
        subjectsSelected: ~~ props.params.subjectId,
        lessonsList,
        lessonsSelected: ~~ props.params.lessonId
    };
};

export default connect(mapStateToProps)(LessonViewerLoading);
