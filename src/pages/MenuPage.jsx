'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import store from '../store';
import { connect } from 'react-redux';
import Stats from '../stats';
import keyboard from '../keyboardEvents';

import Logo from './MenuPage/logo.jsx';
import RightBar from './RightBar.jsx';
import ContextMenu from '../ContextMenu.jsx';

class MenuPage extends React.Component {
    componentDidMount() {
        Stats.dispatch('Отображение главного меню');

        this.contextMenuEvents = keyboard.contextmenu(() => {
            if (this.props.popupActive) {
                // Disable when popup
                return;
            }

            store.dispatch({
                type: this.props.contextMenu ? 'HIDE_CONTEXT_MENU' : 'SHOW_CONTEXT_MENU'
            });
        });

        $(window).on('keydown.handleBackspace', (ev) => {
            if (this.props.popupActive || this.props.contextMenu) {
                // Disable when popup
                return;
            }

            if (ev.keyCode == 8 || ev.keyCode == 27) {
                // Backspace
                ev.preventDefault();

                if (this.props.history.isActive('menu', true)) {
                    // Does not work on first menu screen
                    return;
                }

                // Strip last part of URL
                var url = this.props.location.pathname;
                var urlParts = url.split('/');

                if ( !! this.props.location.query.skipped) {
                    urlParts = urlParts.filter((item) => {
                        // Remove parts that should be skipped
                        return (item.indexOf(this.props.location.query.skipped +'-') === -1);
                    });
                }

                var newUrl = urlParts.slice(0, urlParts.length-1);
                newUrl = newUrl.join('/');

                routerHistory.push(newUrl);
            }
            else if (ev.keyCode == 36) {
                // Home
                ev.preventDefault();
                routerHistory.push('/menu');
            }
        });
    }

    componentWillUnmount() {
        if (this.contextMenuEvents) {
            this.contextMenuEvents();
        }

        $(window).off('keydown.handleBackspace');
    }

    render() {
        return <div>
            <div className="wrapper">
                <div className="white-plate white-plate--top"></div>

                <div className="logo-tbox">
                    <Logo popup={this.props.popup} contextMenu={this.props.contextMenu} />
                </div>

                {this.props.children}
            </div>

            <RightBar params={this.props.params} location={this.props.location} />
            <ContextMenu params={this.props.params} location={this.props.location} />
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        contextMenu: store.menu.contextMenu,
        popupActive: !! store.section.popup,
        popup: store.section.popup
    };
};

export default connect(mapStateToProps)(MenuPage);