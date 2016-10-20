'use strict';

import React from 'react';
import store from '../../store';
import { connect } from 'react-redux';
import keyboard from '../../keyboardEvents';

import Inner from './FlashReconnect/Inner.jsx';

import FlashChecking from '../InitializePage/flash-checking.jsx';
import FlashConnected from '../InitializePage/flash-connected.jsx';
import FlashAllowed from '../InitializePage/flash-allowed.jsx';
import FlashError from '../InitializePage/flash-error.jsx';

class FlashReconnect extends React.Component {
    constructor(props) {
        super(props);

        this.classes = {
            'FlashConnected': 'key01',
            'FlashChecking': 'key02',
            'FlashAllowed': 'key03 step3',
            'Inner': 'key05',
        };
    }

    componentDidMount() {
        /**
         * Animation
         */
        var animation = new TimelineLite()
        .from(this.refs.error101Inner, 0.7, {scale:0}, "error");

        this.keyboardEvents = keyboard.keydown({
            back: () => {
                store.dispatch({
                    type: 'POPUP_HIDE'
                });
            },

            enter: () => {
                if (this.props.reconnectFinished) {
                    store.dispatch({
                        type: 'POPUP_HIDE'
                    });
                }
            }
        });

        store.dispatch({
            type: 'CHANGE_START_PAGE',
            page: 'Inner'
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.flashKey !== nextProps.flashKey) {
            // Flash has been disconnected
            window.location.href = '/';
        }
        else if (this.props.flashConnected !== nextProps.flashConnected && ! nextProps.flashConnected) {
            store.dispatch({
                type: 'CHANGE_START_PAGE',
                page: 'FlashConnected'
            });
        }
    }

    componentWillUnmount() {
        this.keyboardEvents();
    }

    render() {
        let currentClass = 'container-fluid '+ this.classes[this.props.Page];

        return <div id="main" className={currentClass}>
            <div className="error101-inner" ref="error101Inner">
                <Inner isActive={ (this.props.Page === 'Inner')  } />
                <FlashConnected isReconnect={true} isActive={ (this.props.Page === 'FlashConnected')  } />
                <FlashChecking isReconnect={true} isActive={ (this.props.Page === 'FlashChecking')  } />
                <FlashAllowed isReconnect={true} isActive={ (this.props.Page === 'FlashAllowed')  } />
                <FlashError isReconnect={true} isActive={ (this.props.Page === 'FlashError')  } />
            </div>
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        flashConnected: store.system.flashConnected,
        reconnectFinished: store.section.reconnectFinished,
        flashKey: store.system.flashKey,
        Page: store.initializePage.page || 'Inner'
    };
};

export default connect(mapStateToProps)(FlashReconnect);