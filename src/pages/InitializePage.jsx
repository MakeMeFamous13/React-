'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import store from '../store';

import FlashChecking from './InitializePage/flash-checking.jsx';
import FlashConnected from './InitializePage/flash-connected.jsx';
import FlashAllowed from './InitializePage/flash-allowed.jsx';
import FlashError from './InitializePage/flash-error.jsx';
import Recommends from './InitializePage/recommends.jsx';

import Stats from '../stats';
import keyboard from '../keyboardEvents';

function preloadImages(urls, loadedCallback) {
    var loadedCounter = 0;
    var toBeLoadedNumber = urls.length;

    urls.forEach(function (url) {
        preloadImage(url, function () {
            loadedCounter++;

            if (loadedCounter == toBeLoadedNumber) {
                loadedCallback();
            }
        });
    });

    function preloadImage(url, callback) {
        var img = new Image();
        img.src = url;
        img.onload = callback;
    }
}

const INITIAL = 0;
const STARTED = 1;
const LOADING = 2;
const FINISHED = 3;

class InitializePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: INITIAL,
            windowLoaded: false,
            assetsLoaded: false,
            initImageLoaded: false,
            initImagePlayed: false,
            welcomeAnimated: false
        };

        this.timers = [];
    }

    componentDidMount() {
        Stats.dispatch('Загрузка LessonViewer');

        this.keyboardEvents = keyboard.keydown();
        this.contextmenuEvents = keyboard.contextmenu();

        // Limit maximal startup time
        this.timers.push(setTimeout(() => {
            this.setState({ status: FINISHED });
        }, 20000));

        $(window).on('load', () => {
            // Window media loaded
            this.setState({ windowLoaded: true });
        });
    }

    componentWillUnmount() {
        this.timers.map((item) => {
            clearTimeout(item);
        });

        this.keyboardEvents();
        this.contextmenuEvents();
    }

    componentDidUpdate() {
        if (this.state.status === INITIAL && this.state.initImageLoaded) {
            this.setState({ status: STARTED });

            setTimeout(() => {
                this.setState({ initImagePlayed: true });

                if (this.state.windowLoaded && this.state.assetsLoaded) {
                    // Already loaded
                    return;
                }

                this.setState({ status: LOADING });
            }, 4000);

            // Start preloading images
            preloadImages(window.appAssets, () => {
                this.setState({ assetsLoaded: true });
            });
        }

        if (this.state.status > INITIAL
            && this.state.status < FINISHED
            && this.state.windowLoaded
            && this.state.assetsLoaded
            && this.state.initImagePlayed) {
            this.setState({ status: FINISHED });
        }

        if (this.state.status === FINISHED && ! this.state.welcomeAnimated) {
            /**
             * Animation for welcome part
             */
            const welcome = this.refs.welcomeTxt;
            TweenMax.from(welcome, 2, {opacity:0, scale:0.6, ease:Linear.easeNone});
            TweenMax.to(welcome, 2, {opacity:0, scale:1.2, delay: 2});
            $(ReactDOM.findDOMNode(this.refs.wrapperWelcome)).toggleClass("visible");

            setTimeout(() => {
                store.dispatch({
                    type: 'CHANGE_START_PAGE',
                    page: 'FlashConnected'
                });
            }, 4000);

            this.setState({ welcomeAnimated: true });
        }
    }

    imageLoaded() {
        let img = this.refs.loadingImage;

        if ( !! img) {
            let timer = setInterval(() => {
                if (typeof img.naturalWidth !== "undefined" && img.naturalWidth != 0) {
                    clearInterval(timer);
                    this.setState({ initImageLoaded: true });
                }
            }, 100);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.status !== nextState.status
            || this.props.Page !== nextProps.Page
            || this.state.windowLoaded !== nextState.windowLoaded
            || this.state.assetsLoaded !== nextState.assetsLoaded
            || this.state.initImageLoaded !== nextState.initImageLoaded
            || this.state.initImagePlayed !== nextState.initImagePlayed
        );
    }

    render() {
        let wrapperClass = 'wrapper '+ ((this.state.status === FINISHED) ? 'wrapper-welcome' : 'wrapper-start');
        let logoBeginStyle = { display: 'none' };
        let logoLoadStyle = { display: 'none' };
        let logoEndStyle = { display: 'none' };

        switch (this.state.status) {
            case STARTED:
                logoBeginStyle = {};
                break;

            case LOADING:
                logoLoadStyle = { display: 'inline' };
                break;

            case FINISHED:
                logoEndStyle = { display: 'inline' };
                break;
        }

        return <div className={wrapperClass} ref="wrapperWelcome">
            <div className="welcome">
                <div className="welcome-tbox-logo">
                    <img src="/img/logo/logo-begin.gif" onLoad={this.imageLoaded.bind(this)} ref="loadingImage" style={logoBeginStyle} />
                    <img src="/img/logo/logo-load.gif" style={logoLoadStyle} />
                    <img src="/img/logo/logo-end-2.gif" style={logoEndStyle} />
                </div>

                <div className="welcome-txt" ref="welcomeTxt" style={logoEndStyle}>Доброго дня!</div>

                <FlashConnected isActive={ (this.props.Page === 'FlashConnected')  } />
                <FlashChecking isActive={ (this.props.Page === 'FlashChecking')  } />
                <FlashAllowed isActive={ (this.props.Page === 'FlashAllowed')  } />
                <FlashError isActive={ (this.props.Page === 'FlashError')  } />
                <Recommends isActive={ (this.props.Page === 'Recommends')  } />
            </div>
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        Page: store.initializePage.page
    };
};

export default connect(mapStateToProps)(InitializePage);