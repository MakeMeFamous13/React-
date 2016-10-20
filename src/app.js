'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, Link, hashHistory } from 'react-router';

import { Provider } from 'react-redux';
import store from './store';
import { connect } from 'react-redux';

import internet from './services/internet';
import Stats from './stats';

// Pages
import InitializePage from './pages/InitializePage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import LessonViewerLoading from './pages/LessonViewerLoading.jsx';
import LessonViewer from './pages/LessonViewer.jsx';

// Menu pages
import MenuStartPage from './pages/MenuPage/StartPage.jsx';

// Lessons
import MenuSubjectsPage from './pages/MenuPage/SubjectsPage.jsx';
import MenuClassesPage from './pages/MenuPage/ClassesPage.jsx';
import MenuLessonsPage from './pages/MenuPage/LessonsPage.jsx';

// Library
import LibraryViewerLoading from './pages/LibraryViewerLoading.jsx';

// Study pages
import MenuStudyPage from './pages/MenuPage/StudyPage.jsx';

// Popup
import InternetConnection from './pages/Popups/InternetConnection.jsx';
import FlashConnection from './pages/Popups/FlashConnection.jsx';
import InstructionRemote from './pages/Popups/InstructionRemote.jsx';
import FlashReconnect from './pages/Popups/FlashReconnect.jsx';
import StudySystem from './pages/Popups/StudySystem.jsx';
import SoundControl from './pages/Popups/SoundControl.jsx';
import TutorialVideo from './pages/Popups/TutorialVideo.jsx';
import Update from './pages/Popups/Update.jsx';

/**
 * Determine which page to show
 */
class SectionPage extends React.Component {
    constructor(props) {
        super(props);

        /**
         * List of available popups
         */
        this.popups = {
            InternetConnection,
            FlashConnection,
            InstructionRemote,
            FlashReconnect,
            StudySystem,
            SoundControl,
            TutorialVideo,
            Update
        };

        this.internetInterval = null;
        this.flashInterval = null;
        this.flashChecking = false;
        this.updateInterval = false;
        this.updateChecking = false;
    }

    componentDidMount() {
        /**
         * Check for internet every some seconds
         */
        // Immediately invoke after page load
        internet.check();

        // Interval
        this.internetInterval = setInterval(internet.check.bind(internet), 4000);

        /**
         * Check for flash for every some seconds
         */
        this.checkFlash();
        this.flashInterval = setInterval(this.checkFlash.bind(this), 4000);

        /**
         * Check for content update
         */
        this.updateInterval = setInterval(this.checkUpdate.bind(this), 4000);

        /**
         * Look for keyboard
         */
        $(window).on('keydown.trackKeys', Stats.trackKeys.bind(Stats));
    }

    componentWillUnmount() {
        clearInterval(this.internetInterval);
        clearInterval(this.flashInterval);
        clearInterval(this.updateInterval);
        $(window).off('keydown.handleBackspace');
    }

    checkFlash() {
        if (this.flashChecking) {
            // Wait, until previous request is done
            return;
        }

        // Indicate that we are requesting now
        this.flashChecking = true;

        $.get('/init/flash-connected', (response) => {
            this.flashChecking = false;

            if ( ! response) {
                return;
            }

            // Convert to boolean, it's better comparable
            let status = (response.status === 'success');

            if (status === false
                && ! this.props.history.isActive('init')
                && this.props.popup !== 'FlashReconnect'
                && this.props.popup !== 'FlashConnection') {
                // Don't show in reconnect mode
                setTimeout(() => {
                    if (this.props.FlashConnected) {
                        // Became active
                        return;
                    }

                    store.dispatch({
                        type: 'POPUP_FLASH'
                    });
                }, 10000);
            }

            if (status === this.props.FlashConnected) {
                // This is current state, no need to proceed futher
                return;
            }

            if (status === false) {
                store.dispatch({
                    type: 'SYSTEM_NO_FLASH'
                });
            }
            else {
                // Update key before status
                store.dispatch({
                    type: 'SYSTEM_CHANGE_FLASH_KEY',
                    key: response.key
                });

                store.dispatch({
                    type: 'SYSTEM_YES_FLASH'
                });
            }
        }, 'json')
        .fail(() => {
            this.flashChecking = false;
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.flashKey && this.props.flashKey !== nextProps.flashKey) {
            // Flash has been disconnected
            window.location.href = '/';
        }
    }

    checkUpdate() {
        if (this.updateChecking) {
            // Wait, until previous request is done
            return;
        }

        // Indicate that we are requesting now
        this.updateChecking = true;

        $.get('/init/has-updates', (response) => {
            this.updateChecking = false;

            if ( ! response) {
                return;
            }

            if (response.status === true && this.props.location.pathname.indexOf('menu') !== -1) {
                if (this.props.location.pathname.indexOf('menu/study') === -1) {
                    // If not in the study section, go to main menu page,
                    // so contents will be requested again on selection pages
                    hashHistory.push('menu');
                }

                store.dispatch({
                    type: 'CONTENTS_UPDATED'
                });

                store.dispatch({
                    type: 'POPUP_UPDATE'
                });
            }
        }, 'json')
        .fail(() => {
            this.updateChecking = false;
        });
    }

    shouldComponentUpdate(nextProps) {
        return (this.props.children !== nextProps.children
            || this.props.popup !== nextProps.popup
            || this.props.prevPopup !== nextProps.prevPopup
        );
    }

    render() {
        let PopupItem;

        /**
         * Popups section
         * Popups is visible only in MenuPage section
         */
        let { popup } = this.props;

        if ( !! this.props.prevPopup) {
            // Restore previous popup
            popup = this.props.prevPopup;
        }

        PopupItem = this.popups[popup];

        const popupBlock = PopupItem ? <PopupItem/> : '';

        return <div>
            {this.props.children}
            {popupBlock}
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        popup: store.section.popup,
        prevPopup: store.section.prevPopup,
        popupActive: !! store.section.popup,
        Internet: store.system.internet,
        FlashConnected: store.system.flashConnected,
        flashKey: store.system.flashKey
    };
};

SectionPage = connect(mapStateToProps)(SectionPage);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={SectionPage}>
                <IndexRedirect to="/init"/>
                <Route path="init" component={InitializePage}/>
                <Route path="login" component={LogInPage}/>
                <Route path="menu" component={MenuPage}>
                    <IndexRoute component={MenuStartPage}/>
                    <Route path="lessons" component={MenuSubjectsPage}/>
                    <Route path="lessons/subject-:subjectId" component={MenuClassesPage}/>
                    <Route path="lessons/subject-:subjectId/class-:classId" component={MenuLessonsPage}/>

                    <Route path="library" component={MenuSubjectsPage}/>
                    <Route path="library/subject-:subjectId" component={MenuClassesPage}/>
                    <Route path="library/subject-:subjectId/class-:classId" component={MenuLessonsPage}/>

                    <Route path="study" component={MenuStudyPage}/>
                </Route>

                <Route path="lesson/load/subject-:subjectId/class-:classId/lesson-:lessonId" component={LessonViewerLoading}/>
                <Route path="lesson/subject-:subjectId/class-:classId/lesson-:lessonId" component={LessonViewer}/>

                <Route path="library/load/subject-:subjectId/class-:classId/lesson-:lessonId" component={LibraryViewerLoading}/>
                <Route path="library/player/subject-:subjectId/class-:classId/lesson-:lessonId" component={LessonViewer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('layout')
);