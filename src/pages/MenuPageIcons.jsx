'use strict';

import React from 'react';

class IconLessonsMode extends React.Component {
    render() {
        let gifs = {
            1: 'icon_lesson-5.gif',
            2: 'icon_lesson-6.gif',
            4: 'icon_lesson-2.gif'
        };

        var currentGif = gifs[this.props.subjectId] || 'icon_lesson-1.gif';
        var gifUrl = '/img/icon/'+ currentGif;

        return <div className="main-dir">
            <img src={gifUrl}/>
            Уроки
        </div>;
    }

    shouldComponentUpdate(nextProps) {
        return (this.props.subjectId !== nextProps.subjectId);
    }
}

class IconLibraryMode extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        let gifs = {
            1: 'icon_library-5.gif',
            2: 'icon_library-6.gif',
            4: 'icon_library-2.gif'
        };

        var currentGif = gifs[this.props.subjectId] || 'icon_library-1.gif';
        var gifUrl = '/img/icon/'+ currentGif;

        return <div className="main-dir">
            <img src={gifUrl}/>
            Бiблiотека
        </div>;
    }
}

class IconStudyMode extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div className="main-dir">
            <img src="/img/icon/icon_training.gif"/>
            Інструкції
        </div>;
    }
}

class IconStudyRemote extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div className="main-dir">
            <img src="/img/icon/icon_remote-control.png"/>
            <span ref="remoteTitle">Користування ДУ пультом</span>
        </div>;
    }
}

export { IconLessonsMode, IconLibraryMode, IconStudyMode, IconStudyRemote };