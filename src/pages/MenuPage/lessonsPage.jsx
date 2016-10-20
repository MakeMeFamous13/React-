'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import store from '../../store';
import { connect } from 'react-redux';
import _ from 'underscore';
import KeyboardMixin from './keyboardMixin.jsx';
import Stats from '../../stats';

class LessonsPage extends React.Component {
    constructor(props) {
        super(props);

        this.init(this.props);
    }

    componentDidMount() {
        Stats.dispatch(this.isLibrary()
            ? 'Библиотека: Класс выбран - '+ this.props.subjectId
            : 'Класс выбран - '+ this.props.classId
        );

        if (_.isEmpty(this.list)) {
            let url = this.isLibrary() ? '/api/subjects/library' :'/api/subjects/lessons';

            url = (url +'?subject={subject}&class={class}')
            .replace('{subject}', this.props.subjectId)
            .replace('{class}', this.props.classId);

            $.get(url, (response) => {
                response = response || [];

                store.dispatch({
                    type: this.isLibrary() ? 'LIBRARY_LOAD' : 'LESSONS_LOAD',
                    subjectId: this.props.subjectId,
                    classId: this.props.classId,
                    list: response
                });

                this.animate();
            }, 'json');
        }
        else {
            this.animate();
        }
    }

    componentWillUpdate(nextProps) {
        this.init(nextProps);
    }

    init(props) {
        this.list = this.isLibrary() ? props.library : props.lessons;
        this.list = this.list || [];
    }

    isLibrary() {
        return this.props.location.pathname.indexOf('menu/library') !== -1;
    }

    animate() {
        var lessonItem = this.list.map((item, i) => {
            return this.refs['menuBlock'+i];
        });

        var lessonClassnum = this.list.map((item, i) => {
            return this.refs['lessons-items__classnum'+i];
        });

        var lessonDivider = this.list.map((item, i) => {
            return this.refs['lessons-items__divider'+i];
        });

        var lessonSubject = this.list.map((item, i) => {
            return this.refs['lessons-items__subject'+i];
        });

        var tlClassesItems = new TimelineLite();
        tlClassesItems.staggerFrom(lessonItem, 0.7, {opacity:0, scale:0.8, ease:Linear.easeNone}, 0.4, "lessonItem")
        .staggerFrom(lessonClassnum, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "lessonItem+=0.3")
        .staggerFrom(lessonDivider, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "lessonItem+=0.3")
        .staggerFrom(lessonSubject, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "lessonItem+=0.3");
    }

    render() {
        const buttons = this.list.map((item, i) => {
            return <div key={i} className="lessons-items" ref={'menuBlock'+i}>
                <div className="lessons-items__classnum" ref={'lessons-items__classnum'+i}>
                    Урок <span>№{item.num}</span>
                </div>

                <div className="lessons-items__divider" ref={'lessons-items__divider'+i}></div>

                <div className="lessons-items__subject" ref={'lessons-items__subject'+i}>
                    {item.name}
                </div>
            </div>;
        });

        let activeClass = 'lessons-items--active menu-block--active-'+ this.props.selectedSubject.icon;

        return <div>
            <div className="wrapper__main-menu">
                <div className="main-menu__header">
                    <h2 className="main-menu__title">{this.props.selectedSubject.name} за {this.props.selectedClass.class} клас</h2>
                </div>
            </div>

            <KeyboardMixin
                dispatchAction={(current) => {
                    var url = this.isLibrary()
                        ? '/library/load/subject-:subjectId/class-:classNum/lesson-:lessonId'
                        : '/lesson/load/subject-:subjectId/class-:classNum/lesson-:lessonId';

                    url = url.replace(':subjectId', this.props.subjectId)
                        .replace(':classNum', this.props.classId)
                        .replace(':lessonId', current.id);

                    routerHistory.push(url + this.props.location.search);
                }}
                mode="VERTICAL"
                list={this.list}
                sliderItems={3}
                bodyClass="wrapper__lessons-items"
                itemClass="lessons-items"
                activeClass={activeClass}
                buttons={buttons}
                parent={this}
            />
        </div>;
    }
}

const mapStateToProps = (store, props) => {
    const subjectId = ~~ props.params.subjectId;
    const classId = ~~ props.params.classId;

    const selectedSubject = _.findWhere(store.subjects.list, { id: subjectId }) || {};
    const selectedClass = _.findWhere(store.classes[subjectId], { id: classId }) || {};

    // Lessons
    let lessons = store.lessons.list[subjectId];

    if ( !! lessons) {
        lessons = lessons[classId];
    }

    // Library
    let library = store.library.list[subjectId];

    if ( !! library) {
        library = library[classId];
    }

    return {
        lessons: lessons || [],
        library: library || [],
        subjectId,
        classId,
        selectedSubject,
        selectedClass
    };
};

export default connect(mapStateToProps)(LessonsPage);