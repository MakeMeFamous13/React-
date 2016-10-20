'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import store from '../store';
import { connect } from 'react-redux';
import _ from 'underscore';

import keyboard from '../keyboardEvents';
import Pagination from './LessonViewer/Pagination.jsx';

import Logo from './MenuPage/logo.jsx';
import RightBar from './RightBar.jsx';
import ContextMenu from '../ContextMenu.jsx';

class LessonViewer extends React.Component {
    constructor(props) {
        super(props);

        let current = this.currentLesson();

        if (typeof current === 'undefined' || ! current) {
            // Not initialized properly
            this.goBack();
            return;
        }

        this.state = {
            selected: 0,
            topIndex: 0,
            maxItems: current ? current.length : 0,
            controlKeyPressed: false,
            backKeyPressed: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selected == prevState.selected
        && this.state.topIndex == prevState.topIndex) {
            return;
        }

        this.recalculate();
    }

    componentDidMount() {
        let currentLesson = this.currentLesson();

        if ( ! currentLesson) {
            this.goBack();
            return;
        }

        this.recalculate();

        $(window).on('keydown.lessonViewer', (ev) => {
            if (this.props.popupActive || this.props.menu.contextMenu) {
                // Disable when popup
                return;
            }

            if (this.isLibrary()) {
                // Library does not have many items
                return;
            }

            ev.preventDefault();

            let { selected, topIndex } = this.state;
            let controlKeyPressed = false;

            if (ev.keyCode == 33) {
                // Page Up
                selected--;
                topIndex = 0;

                $(this.refs.scrollBtn).css('transform', 'rotate(-30deg)');

                setTimeout(() => {
                    $(this.refs.scrollBtn).css('transform', 'rotate(0deg)');
                }, 300);
            }
            else if (ev.keyCode == 34) {
                // Page Down
                selected++;
                topIndex = 0;

                $(this.refs.scrollBtn).css('transform', 'rotate(30deg)');

                setTimeout(() => {
                    $(this.refs.scrollBtn).css('transform', 'rotate(0deg)');
                }, 300);
            }

            if (typeof this.state.pageContainer.pages !== 'undefined') {
                let topIndexChanged = false;

                if (this.state.pageContainer.nav === 'VERTICAL') {
                    let { canGoTop, canGoBottom, canGoLeft, canGoRight } = this.canGo();

                    if (canGoTop && ev.keyCode == 38) {
                        // Top
                        topIndex--;
                        topIndexChanged = true;
                    }
                    else if (canGoBottom && ev.keyCode == 40) {
                        // Bottom
                        topIndex++;
                        topIndexChanged = true;
                    }
                    else if (canGoLeft && ev.keyCode == 37) {
                        // Left
                        topIndex--;
                        controlKeyPressed = true;
                        topIndexChanged = true;
                    }
                    else if (canGoRight && ev.keyCode == 39) {
                        // Right
                        topIndex++;
                        controlKeyPressed = true;
                        topIndexChanged =  true;
                    }
                }
                else {
                    if (ev.keyCode == 37) {
                        // Left
                        topIndex--;
                        controlKeyPressed = true;
                        topIndexChanged = true;
                    }
                    else if (ev.keyCode == 39) {
                        // Right
                        topIndex++;
                        controlKeyPressed = true;
                        topIndexChanged =  true;
                    }
                }

                if (topIndexChanged) {
                    if (topIndex < 0) {
                        // Go to prev container
                        selected--;

                        let prevLesson = this.currentLesson()[selected];

                        if ( !! prevLesson && typeof prevLesson.pages !== 'undefined') {
                            topIndex = prevLesson.pages.length-1;
                        }
                        else {
                            topIndex = 0;
                        }
                    }
                    else if (topIndex > this.state.pageContainer.pages.length-1) {
                        // Go to next container
                        selected++;
                        topIndex = 0;
                    }
                }
            }
            else {
                if (ev.keyCode == 37) {
                    // Left
                    selected--;
                    controlKeyPressed = true;
                }
                else if (ev.keyCode == 39) {
                    // Right
                    selected++;
                    controlKeyPressed = true;
                }
            }

            if (selected < 0) {
                selected = 0;
            }

            if (selected >= this.state.maxItems-1) {
                selected = this.state.maxItems-1;
            }

            this.setState({
                selected,
                topIndex,
                controlKeyPressed,
            });
        });

        $(window).on('keyup.lessonViewer', () => {
            this.setState({
                controlKeyPressed: false,
                backKeyPressed: false
            });
        });

        this.keydownEvents = keyboard.keydown({
            back: () => {
                if (this.props.popupActive || this.props.contextMenu || ! this.canDo('back')) {
                    // Disable when popup
                    return;
                }

                this.setState({
                    backKeyPressed: true
                });

                this.goBack();
            },

            enter: () => {
                if (this.props.popupActive || this.props.contextMenu || ! this.canDo('enter')) {
                    // Disable when popup
                    return;
                }

                this.setState({
                    selected: 0,
                    topIndex: 0
                });
            },

            home: () => {
                if (this.props.popupActive || this.props.contextMenu) {
                    // Disable when popup
                    return;
                }

                routerHistory.push('/menu');
            }
        });

        this.contextMenuEvents = keyboard.contextmenu(() => {
            if (this.props.popupActive) {
                // Disable when popup
                return;
            }

            if ( ! this.props.contextMenu) {
                store.dispatch({
                    type: 'SHOW_CONTEXT_MENU'
                });
            }
            else {
                store.dispatch({
                    type: 'HIDE_CONTEXT_MENU'
                });
            }
        });
    }

    componentWillUnmount() {
        $(window).off('keydown.lessonViewerNav');
        $(window).off('keyup.lessonViewer');

        if (this.keydownEvents) {
            this.keydownEvents();
        }

        if (this.contextMenuEvents) {
            this.contextMenuEvents();
        }

        // Free lesson content from memory
        delete window.completeLib;
        delete window.images;
        delete window.ss;
    }

    isLibrary() {
        return this.props.location.pathname.indexOf('library') !== -1;
    }

    currentLesson() {
        return this.isLibrary() ? this.props.currentLibrary : this.props.currentLesson;
    }

    goBack() {
        var url = this.isLibrary()
            ? '/menu/library/subject-:subjectId/class-:classId'
            : '/menu/lessons/subject-:subjectId/class-:classId';

        url = url.replace(':subjectId', this.props.params.subjectId)
        .replace(':classId', this.props.params.classId);

        routerHistory.push(url + this.props.location.search);
    }

    recalculate() {
        let { selected, topIndex } = this.state;

        // Get container page
        let currentLesson = this.currentLesson();
        let pageContainer = currentLesson[selected];

        if ( ! pageContainer) {
            return;
        }

        let pageClass = (typeof pageContainer.pages !== 'undefined' && pageContainer.pages)
            ? pageContainer.pages[topIndex]
            : pageContainer;

        let currentPage = ( !! pageClass) ? pageClass.page : '';
        let { canGoTop, canGoBottom, canGoLeft, canGoRight } = this.canGo();

        this.setState({
            pageContainer,
            pageClass,
            currentPage,

            canGoLeft,
            canGoRight,
            canGoTop,
            canGoBottom
        });
    }

    canGo() {
        let { selected, topIndex } = this.state;
        const currentLesson = this.currentLesson();
        const pageContainer = currentLesson[selected];

        let canGoTop = false;
        let canGoBottom = false;
        let canGoLeft = (selected > 0);
        let canGoRight = (selected < currentLesson.length-1);

        if (typeof pageContainer.pages !== 'undefined') {
            if (pageContainer.nav === 'VERTICAL') {
                canGoTop = (topIndex > 0 && topIndex <= pageContainer.pages.length-1);
                canGoBottom = (topIndex >= 0 && topIndex < pageContainer.pages.length-1);
                canGoLeft = (canGoLeft && topIndex == 0);
                canGoRight = (canGoRight && topIndex == pageContainer.pages.length-1);
            }
            else {
                canGoLeft = (canGoLeft && topIndex >= 0);
                canGoRight = (canGoRight && topIndex <= pageContainer.pages.length-1);
            }
        }

        return { canGoTop, canGoBottom, canGoLeft, canGoRight };
    }

    canDo(actionName) {
        const currentLesson = this.currentLesson();
        let back = false;
        let enter = false;

        if (this.state.selected >= currentLesson.length-1) {
            back = enter = true;
        }

        const result = { back, enter };
        return ( !! actionName) ?  result[actionName] : result;
    }

    render() {
        let Page = this.state.currentPage;

        if (this.isLibrary()) {
            // Make IMG from library resource
            let resourceUrl = this.currentLesson().resource;
            Page = <img src={resourceUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        }
        else {
            if ( !! Page && React.Component.isPrototypeOf(Page)) {
                Page = <Page parent={this} resources={this.state.pageClass.resources} />;
            }
        }

        let leftArrow;
        let rightArrow;
        let upArrow;
        let bottomArrow;

        if (this.state.canGoLeft) {
            leftArrow = <div className="arrow-v-block arrow-v-block--left">
                <div className="arrow arrow--left">
                    <img src="img/btn-green-left.png" alt="" className="arrow__img"/>
                </div>
            </div>;
        }

        if (this.state.canGoRight) {
            rightArrow = <div className="arrow-v-block arrow-v-block--right">
                <div className="arrow arrow--right">
                    <img src="img/btn-green-right.png" alt="" className="arrow__img"/>
                </div>
            </div>;
        }

        if (this.state.canGoTop) {
            upArrow = <div className="arrow-h-block arrow-h-block--top">
                 <div className="arrow arrow--top">
                 <img src="img/btn-green-up.png" alt="" className="arrow__img"/>
                 </div>
             </div>;
        }

        if (this.state.canGoBottom) {
            bottomArrow = <div className="arrow-h-block arrow-h-block--bottom">
                 <div className="arrow arrow--bottom">
                 <img src="img/btn-green-down.png" alt="" className="arrow__img"/>
                 </div>
             </div>;
        }

        let navKeyClass = 'navbottom-button';

        if (this.state.controlKeyPressed) {
            navKeyClass += ' btn-pressed';
        }

        // Back button
        let backKeyClass = 'navbottom-button';

        if (this.state.backKeyPressed) {
            backKeyClass += ' btn-pressed';
        }

        let backButton = '';

        if (this.canDo('back')) {
            backButton = <div className={backKeyClass}>
                <img src="/img/btn-green-return.png" alt="" className="navbottom-button__img"/>
                Вихiд
            </div>;
        }

        // Enter button
        let enterButton = '';

        if (this.canDo('enter')) {
            enterButton = <div className="navbottom-button">
                <img src="/img/btn-green-enter.png" alt="" className="navbottom-button__img"/>
                З початку
            </div>;
        }

        // Context menu settings
        const subject = _.findWhere(this.props.subjectsList, { id: ~~ this.props.params.subjectId });

        if ( !! subject) {
            var subjectColor = subject.icon;
        }
        
        return <div>
            {Page}

            {
                this.props.contextMenu
                    // wrapper-start is for background none!
                    ? <div className="wrapper wrapper-start">
                        <div className="logo-tbox">
                            <Logo popup={this.props.popup} contextMenu={this.props.contextMenu} />
                        </div>
                    </div>
                    : ''
            }

            <div className="wrapper-navigation">
                {upArrow}
                {rightArrow}
                {bottomArrow}
                {leftArrow}

                <div className="wrapper-navbottom">
                    <div className="navbottom-left">
                        <div className="navbottom-button">
                            <img src="/img/btn-green-menu.png" alt="" className="navbottom-button__img"/>
                                Меню
                        </div>
                        <div className={navKeyClass}>
                            <img src="/img/btn-green-nav.png" alt="" className="navbottom-button__img"/>
                                Навігація
                        </div>

                        {enterButton}
                        {backButton}
                    </div>
                    <div className="navbottom-right">
                        <Pagination totalPages={this.state.maxItems} currentPageIndex={this.state.selected} />

                        <div className="navbottom-scroll">
                            <img src="/img/btn-green-scroll-arrow.png" className="navbottom-scroll__arr"/>
                            <img src="/img/btn-green-scroll-full.png" className="navbottom-scroll__img" ref="scrollBtn"/>
                        </div>
                    </div>
                </div>
            </div>

            {
                this.props.contextMenu
                ? <RightBar params={this.props.params} location={this.props.location} />
                : ''
            }

            <ContextMenu params={this.props.params} location={this.props.location} color={subjectColor} />
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.system.user,
        subjectsList: store.subjects.list,
        currentLesson: store.lessons.current,
        currentLibrary: store.library.current,
        menu: store.menu,
        popup: store.section.popup,
        contextMenu: store.menu.contextMenu,
        popupActive: !! store.section.popup,
    };
};

export default connect(mapStateToProps)(LessonViewer);
