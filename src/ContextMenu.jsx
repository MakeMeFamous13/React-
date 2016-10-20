'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import store from './store';
import { connect } from 'react-redux';
import _ from 'underscore';
import Stats from './stats';

//import { IconUser } from './ContextMenuIcons.jsx';

class ContextMenu extends React.Component {
    constructor(props) {
        super(props);

        const goto = function(url) {
            // Carry
            return () => {
                store.dispatch({
                    type: 'HIDE_CONTEXT_MENU'
                });

                routerHistory.push(url);
            };
        };

        let menuList = [
            { id: 1, name: 'Налаштування звуку', func: () => {
                store.dispatch({
                    type: 'POPUP_SOUND_SHOW'
                });
            } },
            { id: 2, name: 'Змінити користувача', func: () => {
                store.dispatch({
                    type: 'POPUP_FLASH_RECONNECT_SHOW'
                });
            } }
        ];

        if (this.props.location.pathname.indexOf('lesson/') != -1
            || this.props.location.pathname.indexOf('library/') != -1) {
            /**
             * Lesson mode
             */
            var backUrl = (this.props.location.pathname.indexOf('library') !== -1)
                ? '/menu/library/subject-:subjectId/class-:classId'
                : '/menu/lessons/subject-:subjectId/class-:classId';

            backUrl = backUrl.replace(':subjectId', this.props.params.subjectId)
            .replace(':classId', this.props.params.classId);

            var libraryUrl = '/menu/library/subject-:subjectId/class-:classId';
            libraryUrl = libraryUrl.replace(':subjectId', this.props.params.subjectId)
            .replace(':classId', this.props.params.classId);

            menuList = menuList.concat([
                { id: 3, name: 'Вийти з уроку', type: 'helpblock', func: goto(backUrl) },
                { id: 4, name: 'Уроки', type: 'helpblock', func: goto('/menu/lessons') },
                { id: 5, name: 'Бібліотека', type: 'helpblock', func: goto(libraryUrl) },
                { id: 6, name: 'Навчання системi', type: 'helpblock', func: () => {
                    store.dispatch({
                        type: 'POPUP_STUDY_SYSTEM_SHOW'
                    });
                } },
                { id: 7, name: 'Навчання пульту', type: 'helpblock', func: () => {
                    store.dispatch({
                        type: 'POPUP_TUTORIAL_SHOW'
                    });
                } }
            ]);
        }
        else {
            /**
             * Normal mode
             */
            menuList = menuList.concat([
                { id: 3, name: 'Головна', type: 'helpblock', func: goto('/menu') },
                { id: 4, name: 'Уроки', type: 'helpblock', func: goto('/menu/lessons') },
                { id: 5, name: 'Бібліотека', type: 'helpblock', func: goto('/menu/library') },
                { id: 6, name: 'Інструкції', type: 'helpblock', func: goto('/menu/study') }
            ]);
        }

        this.state = {
            list: menuList,
            focused: 0,
            selected: null
        };

        this.prevVisible = false;
    }

    componentDidMount() {
        var { setupBlock, setupUser, setupUserDecr } = this.refs;

        var setupOption = this.state.list.map((item) => {
            return this.refs['setupOption'+ item.id];
        });

        setupOption.push(this.refs.tuningblock);
        setupOption = setupOption.filter(Boolean);

        this.tlSetup = new TimelineLite();
        this.tlSetup
        .call(() => {
            if ( ! this.props.visible) {
                store.dispatch({
                    type: 'CLOSE_CONTEXT_MENU'
                });
            }
        }, null, null, 'setupBlock-=3')
        .to(this.refs.setupWrapper, 1, {opacity: 1}, 0)
        .from(setupBlock, 0.7, {opacity:0, x:-850}, "setupBlock")
        .from(setupUser, 1, {opacity:0}, 0)
        .from(setupUserDecr, 1, {opacity:0}, 0)
        .staggerFrom(setupOption, 0.5, {opacity:0, x:-200}, 0.1, "setupBlock+=0.2")
        .pause();

        if (this.props.visible === true) {
            Stats.dispatch('Отображение контекстного меню');
        }

        $(window).on('keydown.contextmenu', (ev) => {
            if ( ! this.props.visible || this.props.popupActive) {
                // Disable when not visible
                return;
            }

            let { focused, selected } = this.state;

            if (ev.keyCode === 38) {
                // Top
                focused--;
            }
            else if (ev.keyCode === 40) {
                // Bottom
                focused++;
            }
            else if (ev.keyCode === 13) {
                // Enter
                selected = focused;

                // Execute action
                let func = this.state.list[selected].func;

                if ( !! func) {
                    this.state.list[selected].func();
                }
            }
            else {
                return;
            }

            ev.preventDefault();

            if (focused < 0) {
                focused = 0;
            }

            if (focused > this.state.list.length-1) {
                focused = this.state.list.length-1;
            }

            this.setState({focused, selected});
        });
    }

    componentDidUpdate() {
        if ( ! this.prevVisible && this.props.visible) {
            // First time visible
            this.tlSetup
            .progress(0)
            .play();
        }

        this.prevVisible = this.props.visible;
    }

    componentWillUpdate(nextProps) {
        if (this.prevVisible && ! nextProps.visible) {
            // Hidden
            this.tlSetup.reverse(0);
        }
    }

    componentWillUnmount() {
        $(window).off('keydown.contextmenu');
        this.tlSetup.pause();

        store.dispatch({
            type: 'CLOSE_CONTEXT_MENU'
        });
    }

    showItem(id, isHelpBlock) {
        let item = _.findWhere(this.state.list, { id });

        if ( ! item) {
            return;
        }

        let focusedItem = this.state.list[this.state.focused];
        let className;
        const activeClass = isHelpBlock ? 'helpblock--active' : 'tuningblock-active';

        if (typeof focusedItem !== 'undefined') {
            className = focusedItem.id === item.id ? activeClass : '';
        }

        if (isHelpBlock) {
            return <div className={'helpblock '+ className} ref={'helpblock'+ id}>
                <h2 className="setup-option" ref={'setupOption'+ id}>{item.name}</h2>
            </div>;
        }
        else {
            return <li className={className}><div>{item.name}</div></li>;
        }
    }

    activeItem() {
        return (this.state.selected !== null)
            ? this.state.list[this.state.selected]
            : null;
    }

    render() {
        let visibleClass;

        if (this.props.visible === null) {
            visibleClass = 'hidden';
        }
        else if (this.props.visible === true) {
            visibleClass = 'visible';
        }

        let className = 'setup-wrapper '+ visibleClass;

        // Setup block left
        var setupBlockLeft = 'setupblock-left';

        if ( !! this.props.color) {
            setupBlockLeft += ' setupblock-left--'+ this.props.color;
        }

        return <div className={className} style={{opacity:0}} ref="setupWrapper">
            <div className="wrapper__user-block wrapper__user-block--top-left">
                <div className="user-block user-block--horizontal">
                    <img src="/img/teacher.png"/>

                    <div className="user-block__details" id="setup-user" ref="setupUser">
                        <div className="user-block__title">
                            {this.props.user.name}
                        </div>
                        <div className="user-block__description" id="setup-user-decr" ref="setupUserDecr">
                            {this.props.user.school}
                        </div>
                    </div>
                </div>
            </div>
            <div className={setupBlockLeft} id="setup-block" ref="setupBlock">
                <div className="scroll-pane">
                    <div className="setupblock-left-content">
                        <hr/>

                        <div className="tuningblock" ref="tuningblock">
                            <h2>Налаштування</h2>
                            <ul>
                                {this.showItem(1)}
                                {this.showItem(2)}
                            </ul>
                        </div>

                        {this.showItem(3, true)}
                        {this.showItem(4, true)}
                        {this.showItem(5, true)}
                        {this.showItem(6, true)}
                        {this.showItem(7, true)}
                    </div>
                </div>
            </div>
            {/*<div className="setupblock-right" ref="setupContent">
                <div className="box120px"></div>
                <div className="contentblock-right">
                    {contentTag}
                </div>
            </div>*/}
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        visible: store.menu.contextMenu,
        popupActive: !! store.section.popup,
        user: store.system.user
    };
};

export default connect(mapStateToProps)(ContextMenu);