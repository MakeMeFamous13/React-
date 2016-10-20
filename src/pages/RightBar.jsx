'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { ArrowsHorizontal, ArrowsVertical } from './MenuPage/buttons/arrows.jsx';
import MenuButton from './MenuPage/buttons/menu.jsx';
import BackButton from './MenuPage/buttons/back.jsx';
import EnterButton from './MenuPage/buttons/enter.jsx';

import { IconLessonsMode, IconLessonsModeActive, IconLibraryMode, IconLibraryModeActive, IconStudyMode, IconStudyRemote } from './MenuPageIcons.jsx';

class RightBar extends React.Component {
    componentDidMount() {
        $.Velocity(this.refs.navmain, 'fadeIn', { duration: 1500, delay: 1000 }, { display: "block" });
    }

    componentDidUpdate() {
        if (this.props.popup === 'InstructionRemote') {
            if ( !! this.refs.currentIcon.refs.remoteTitle) {
                var tlRemote = new TimelineLite();
                tlRemote.from(this.refs.currentIcon.refs.remoteTitle, 1, {opacity:0}, "remoteTitle")
            }
        }
    }

    render() {
        /**
         * Help buttons
         */
        let gobackButton;
        let menuButton;
        let enterButton;

        if (this.props.popup === 'SoundControl') {
            enterButton = <EnterButton toggleMode={true} toggled={this.props.sound} />;
        }
        else if (this.props.popup === 'StudySystem' && this.props.studyFinished) {
            enterButton = <EnterButton studyFinished={true} />;
        }
        else if (this.props.popup === 'Update' || (this.props.popup === 'FlashReconnect' && this.props.reconnectFinished)) {
            enterButton = <EnterButton actionName="Продовжити" />;
        }
        if ( ! this.props.popupActive && ! this.props.contextMenu) {
            enterButton = <EnterButton/>;
        }

        if (( ! this.props.popupActive && ! this.props.contextMenu)
            || (['StudySystem', 'SoundControl', 'FlashReconnect', 'InstructionRemote'].indexOf(this.props.popup) != -1)) {
            let inversed = (['StudySystem', 'InstructionRemote'].indexOf(this.props.popup) != -1);

            if (this.props.popup === 'FlashReconnect' && ! this.props.reconnectFinished) {
                gobackButton = <BackButton inversed={inversed}/>;
            }
        }

        var urlParts = this.props.location.pathname.split('/');
        urlParts = urlParts.filter(item => !! item);

        if ( ! this.props.popupActive && urlParts[0] === 'menu' && urlParts.length === 1) {
            // Don't show on first menu back
            gobackButton = '';
        }

        if ( ! this.props.popupActive) {
            menuButton = <MenuButton/>;
        }

        /**
         * Arrows
         */
        let arrows;
        let isLesson = this.props.location.pathname.indexOf('lesson/') !== -1;

        if ( ! isLesson) {
            if ( ! this.props.popupActive) {
                if (this.props.contextMenu !== null || this.props.selectedClass > 0) {
                    arrows = <ArrowsVertical/>;
                }
            }
        }

        if ( ! arrows && (( ! isLesson && ! this.props.popupActive) || ['InstructionRemote', 'StudySystem'].indexOf(this.props.popup) != -1)) {
            arrows = <ArrowsHorizontal/>;
        }

        /**
         * Icons
         */
        let CurrentIcon;

        if ( ! this.props.popupActive && this.props.contextMenu === null) {
            CurrentIcon = this.props.currentIcon;
        }

        if (this.props.popup === 'InstructionRemote') {
            CurrentIcon = IconStudyRemote;
        }

        let wrapperNavMainClass = 'wrapper-navmain';

        if (this.props.popup === 'InstructionRemote') {
            wrapperNavMainClass += ' wrapper-navmain--remote';
        }

        return <div className={wrapperNavMainClass}>
            <div id="controlblock-top" className="navmain navmain--top">
                <div className="navmain__left-bar">
                    {CurrentIcon ? <CurrentIcon ref="currentIcon" subjectId={this.props.params.subjectId} /> : ''}
                </div>

                <div className="navmain__right-bar" style={{opacity:0}} ref="navmain">
                    {gobackButton}
                    {enterButton}
                    {menuButton}
                </div>
            </div>

            {arrows}
        </div>
    }
}

const mapStateToProps = (store, props) => {
    let currentIcon = null;
    let url = props.location.pathname;

    if (url.indexOf('/menu/lessons') != -1) {
        currentIcon = IconLessonsMode;
    }
    else if (url.indexOf('/menu/library') != -1) {
        currentIcon = IconLibraryMode;
    }
    else if (url.indexOf('/menu/study') != -1) {
        currentIcon = IconStudyMode;
    }

    return {
        contextMenu: store.menu.contextMenu,
        popupActive: !! store.section.popup,
        popup: store.section.popup,
        sound: store.system.sound,
        selectedClass: props.params.classId,
        studyFinished: store.section.studyFinished,
        reconnectFinished: store.section.reconnectFinished,
        currentIcon
    };
};

export default connect(mapStateToProps)(RightBar);