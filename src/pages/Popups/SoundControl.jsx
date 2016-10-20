'use strict';

import React from 'react';
import store from '../../store';
import { connect } from 'react-redux';
import keyboard from '../../keyboardEvents';

class SoundOn extends React.Component {
    render() {
        return <div className="row vstretch">
            <div className="col-xs-12 vstretch">
                <div className="steps-content sound-on">
                    Звук увімкнено
                </div>

                <div className="steps-box">
                    <img src="/img/sound.png" alt=""/>
                    <div className="icon-circle icon-circle--148 steps-preload steps-preload--error error-circle" ref="error-circle" id="preload-error">
                        <svg className="soundon icon-ico--148" xmlns="http://www.w3.org/2000/svg" viewBox="-231 323 148 148">
                            <style>
                                {`.soundon-st0{fill:url(#XMLID_2_);} .soundon-st1{fill:#FFFFFF;} .soundon-st2{fill:#6ED139;}`}
                            </style>
                            <linearGradient id="XMLID_2_" x1="-105.641" x2="-202.308" y1="352.969" y2="451.135" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 796)">
                                <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                                <stop offset="1" stopOpacity=".4"/>
                            </linearGradient>
                            <path id="XMLID_24_" d="M-83 413.5V471h-43.5l-62.7-60.3 4.1-3.8 2.4.6 1.5-    1.5-.8-4.2.8-5.9-4.2-4.6.8-4 12.6-2 4.4-8.8 8.3-2.8 4.7-11.2 20.4 16.3 1.7-6.3z" className="soundon-st0"/>
                            <path d="M-133.9 373.4c-.9-.9-2.1-1.4-3.5-1.4s-2.7.6-3.6 1.6c-1.7 1.9-1.6 4.9.3 6.8 8.5 8.6 8.5 22.6-.1 31.2-.9.9-1.4 2.1-1.4 3.4s.5 2.5 1.4 3.5c.9.9 2.2 1.4 3.5 1.4s2.5-.5 3.5-1.4c6-6 9.4-14 9.4-22.5-.1-8.5-3.4-16.5-9.5-22.6zm-23.9-10.4c-1 0-2 .5-3 1.5l-16.6 16.5h-8.4c-2 0-3.7 1.7-3.7 3.7v22.5c0 2.1 1.7 3.7 3.7 3.7h8.4l16.6 16.5c1 1 2 1.5 3 1.5 1.3 0 2.9-1 2.9-3.9v-58.2c0-2.8-1.6-3.8-2.9-3.8zm-9.2 44.6l-5.9-5.9-.5-.5h-4.2v-10.5h4.1l6.3-6.3v23.2h.2zm21.1-27.8c-.9-.9-2.1-1.4-3.5-1.4s-2.7.6-3.7 1.6c-1.7 1.9-1.5 4.9.4 6.8 4.9 5.1 4.9 13.4-.2 18.4-.9.9-1.4 2.1-1.4 3.4s.5 2.5 1.4 3.4 2.1 1.4 3.5 1.4c1.3 0 2.5-.5 3.4-1.4 4.3-4.3 6.7-10.1 6.7-16.2.1-5.9-2.2-11.7-6.6-16z" className="soundon-st1"/>
                            <path d="M-132.3 372.4c-1.2-1.2-2.8-1.9-4.5-1.9-1.8 0-3.5.8-4.8 2.1-2.3 2.5-2.1 6.4.3 8.9 7.9 8 7.9 21.1-.1 29-1.2 1.2-1.9 2.8-1.9 4.5s.7 3.3 1.9 4.5 2.8 1.9 4.5 1.9 3.3-.7 4.5-1.9c6.3-6.3 9.8-14.7 9.8-23.6.1-8.8-3.3-17.2-9.7-23.5zm-2.1 45c-.7.7-1.5 1-2.4 1s-1.7-.3-2.4-1c-1.3-1.3-1.3-3.5 0-4.8 9.2-9.2 9.2-24.1.1-33.3-1.3-1.3-1.5-3.4-.3-4.8.7-.7 1.6-1.1 2.5-1.1s1.7.3 2.4 1c5.8 5.7 8.9 13.4 8.9 21.5.1 8.2-3 15.8-8.8 21.5zm-31.8-34.9c-.3 0-.6.1-.9.4l-6.4 6.4h-5v13.4h5l6.5 6.5c.2.2.5.3.8.3.6 0 1.1-.4 1.1-1.1v-24.7c.2-.7-.4-1.2-1.1-1.2zm-1.7 21.4l-3.3-3.3-.9-.9h-3.3v-7.5h3.3l.9-.9 3.4-3.3-.1 15.9zm23.6-25.2c-1.2-1.2-2.8-1.9-4.5-1.9-1.5 0-3 .5-4.1 1.5v-11.5c0-3.7-2.2-5.4-4.4-5.4-1.4 0-2.7.6-4 1.9l-16.1 16.1h-7.8c-2.9 0-5.2 2.3-5.2 5.2v22.5c0 2.9 2.4 5.2 5.2 5.2h7.8l16.1 16.1c1.6 1.6 3.1 1.9 4 1.9 2.2 0 4.4-1.7 4.4-5.4v-11.5c1.1 1 2.6 1.5 4.1 1.5 1.7 0 3.3-.7 4.5-1.9 4.6-4.6 7.1-10.7 7.1-17.2.1-6.3-2.5-12.5-7.1-17.1zm-13 48.8c-.5 0-1.2-.3-1.9-1l-17-17h-9c-1.2 0-2.2-1-2.2-2.2v-22.5c0-1.2 1-2.2 2.2-2.2h9l17-17c.7-.7 1.4-1 1.9-1 .8 0 1.4.8 1.4 2.4v58.2c0 1.4-.6 2.3-1.4 2.3zm4.4-23.8v-15.5c4 4.4 4 11.2 0 15.5zm6.5 7.4c-.7.7-1.5 1-2.4 1s-1.7-.3-2.4-1c-1.3-1.3-1.3-3.5 0-4.8 5.7-5.6 5.7-14.8.2-20.5-1.3-1.3-1.5-3.4-.3-4.8.7-.8 1.6-1.1 2.5-1.1s1.7.3 2.4 1c8.4 8.3 8.4 21.9 0 30.2z" className="soundon-st2"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>;
    }
}

class SoundOff extends React.Component {
    render() {
        return <div className="row vstretch">
            <div className="col-xs-12 vstretch">
                <div className="steps-content sound-off">
                    Звук вимкнено
                </div>

                <div className="steps-box">
                    <img src="/img/sound.png" alt=""/>
                    <div className="icon-circle icon-circle--148 steps-preload steps-preload--error error-circle" ref="error-circle" id="preload-error">
                        <svg className="soundoff icon-ico--148" xmlns="http://www.w3.org/2000/svg" viewBox="-231 323 148 148">
                            <style>
                                {`.soundoff-st0{fill:url(#XMLID_2_);} .soundoff-st1{fill:#FFFFFF;} .soundoff-st2{fill:#DA0000;}`}
                            </style>
                            <linearGradient id="XMLID_2_" x1="-106.424" x2="-203.091" y1="443.802" y2="345.635" gradientUnits="userSpaceOnUse">
                                <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                                <stop offset="1" stopOpacity=".4"/>
                            </linearGradient>
                            <path id="XMLID_24_" d="M-83 416.6V471h-43.5l-62.7-60.3 4.1-3.8 2.4.6 1.5-1.5-.8-4.2.8-5.9-4.2-4.6.8-4 12.6-2 4.4-8.8 8.3-2.8 4.7-11.2 25.7 21 5.3-.5z" className="soundoff-st0"/>
                            <path d="M-157.4 363c-1 0-2 .5-2.9 1.5l-16.5 16.5h-8.4c-2 0-3.7 1.7-3.7 3.7v22.5c0 2.1 1.7 3.7 3.7 3.7h8.4l16.5 16.5c1 1 2 1.5 2.9 1.5 1.3 0 2.9-1 2.9-3.9v-58.2c0-2.8-1.6-3.8-2.9-3.8zm-9.1 44.6l-5.9-5.9-.5-.5h-4.2v-10.5h4.1l6.3-6.3v23.2zm42.4-17.3c.7-.7 1.2-1.8 1.2-2.8 0-2.2-1.8-4-4-4-1 0-2.1.4-2.8 1.2l-3.1 3.1c-1.5 1.5-4 1.5-5.6 0l-3.1-3.1c-.7-.7-1.7-1.2-2.8-1.2-2.2 0-4 1.8-4 4 0 1.1.4 2.1 1.2 2.8l3.1 3.1c1.5 1.5 1.5 4.1 0 5.6l-3.1 3.1c-.7.7-1.2 1.8-1.2 2.8 0 2.2 1.8 4 4 4 1 0 2.1-.4 2.8-1.2l3.1-3.1c1.5-1.5 4-1.5 5.6 0l3.1 3.1c.7.7 1.7 1.2 2.8 1.2 2.2 0 4-1.8 4-4 0-1.1-.4-2.1-1.2-2.8l-3.1-3.1c-1.5-1.5-1.5-4.1 0-5.6l3.1-3.1z" className="soundoff-st1"/>
                            <path d="M-166.2 382.5c-.3 0-.6.1-.9.4l-6.3 6.4h-5v13.4h5l6.5 6.5c.2.2.5.3.8.3.6 0 1.1-.4 1.1-1.1v-24.7c0-.7-.6-1.2-1.2-1.2zm-1.7 21.4l-3.3-3.3-.9-.9h-3.3v-7.5h3.3l.9-.9 3.3-3.3v15.9zm10.5-42.4c-1.4 0-2.7.6-4 1.9l-16.1 16.1h-7.8c-2.9 0-5.2 2.3-5.2 5.2v22.5c0 2.9 2.3 5.2 5.2 5.2h7.8l16.1 16.1c1.6 1.6 3 1.9 4 1.9 2.2 0 4.4-1.7 4.4-5.4v-58.2c0-3.7-2.2-5.3-4.4-5.3zm0 66c-.5 0-1.2-.3-1.9-1l-16.9-17h-9c-1.2 0-2.2-1-2.2-2.2v-22.5c0-1.2 1-2.2 2.2-2.2h9l16.9-17c.7-.7 1.4-1 1.9-1 .8 0 1.4.8 1.4 2.4v58.2c0 1.4-.5 2.3-1.4 2.3zm31.3-29.6c-.5-.5-.7-1.1-.7-1.7 0-.7.3-1.3.7-1.7l3.1-3.1c1-1 1.6-2.4 1.6-3.9 0-3-2.4-5.5-5.4-5.5-1.5 0-2.8.6-3.9 1.6l-3.1 3.1c-.9.9-2.5.9-3.5 0l-3.1-3.1c-1-1-2.4-1.6-3.9-1.6-3 0-5.4 2.5-5.4 5.5 0 1.4.6 2.8 1.6 3.9l3.1 3.1c.5.5.7 1.1.7 1.7 0 .7-.3 1.3-.7 1.7l-3.1 3.1c-1 1-1.6 2.4-1.6 3.9 0 3 2.4 5.5 5.4 5.5 1.5 0 2.8-.6 3.9-1.6l3.1-3.1c1-1 2.5-1 3.5 0l3.1 3.1c1 1 2.4 1.6 3.9 1.6 3 0 5.4-2.5 5.4-5.5 0-1.5-.6-2.8-1.6-3.9l-3.1-3.1zm-.8 9.5c-.7 0-1.3-.3-1.7-.7l-3.1-3.1c-1.1-1.1-2.5-1.6-3.9-1.6s-2.8.5-3.9 1.6l-3.1 3.1c-.5.5-1.1.7-1.7.7-1.4 0-2.5-1.1-2.5-2.5 0-.7.3-1.3.7-1.7l3.1-3.1c1-1 1.6-2.4 1.6-3.9s-.6-2.8-1.6-3.9l-3.1-3.1c-.5-.5-.7-1.1-.7-1.7 0-1.4 1.1-2.5 2.5-2.5.7 0 1.3.3 1.7.7l3.1 3.1c1 1 2.4 1.6 3.9 1.6s2.8-.6 3.9-1.6l3.1-3.1c.5-.5 1.1-.7 1.7-.7 1.4 0 2.5 1.1 2.5 2.5 0 .6-.3 1.3-.7 1.7l-3.1 3.1c-1 1-1.6 2.4-1.6 3.9s.6 2.8 1.6 3.9l3.1 3.1c.5.5.7 1.1.7 1.7 0 1.3-1.1 2.5-2.5 2.5z" className="soundoff-st2"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>;
    }
}

class SoundControl extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /**
         * Animation
         */
        var tlError101 = new TimelineLite()
        .from(this.refs['error101-inner'], 0.7, {scale:0}, "error")
        .from(this.refs['steps-footer-error'], 1, {opacity:0}, "error+=0.25")
        .from(this.refs.icon.refs['error-circle'], 0.7, {opacity:0, scale:1.2, ease:Linear.easeNone}, "error+=0.25");

        this.keyboardEvents = keyboard.keydown({
            enter: () => {
                var newValue = !this.props.sound;

                // Turn on or off
                $.get('/system/sound/' + (newValue ? 'on' : 'off'));

                store.dispatch({
                    type:  'SYSTEM_CHANGE_SOUND',
                    sound: newValue
                });
            },

            back: () => {
                store.dispatch({
                    type: 'POPUP_HIDE'
                });
            }
        });
    }

    componentWillUnmount() {
        this.keyboardEvents();
    }

    render() {
        let block = this.props.sound ? <SoundOn ref="icon"/> : <SoundOff ref="icon"/>;

        return <div id="main" className="container-fluid error101">
            <div className="error101-inner" ref="error101-inner">
                <div id="mainblock-header" className="mainblock-header">
                    <div className="row">
                        <div className="col-xs-12 menu-item text-center">
                            <h2 className="main-content-header">Налаштування звуку</h2>
                        </div>
                    </div>
                </div>

                {block}

                <div id="steps-bottom" className="controlblock controlblock-bottom">
                    <div className="control-wrapper vstretch">
                        <div className="steps-footer steps-footer-error" ref="steps-footer-error">
                            Якщо звук не відтворюється, перезавантажте пристрій. Якщо перезавантаження не допомагає, <br/>
                            будь ласка зверніться до представника компанії "T-Box"
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        sound: store.system.sound
    };
};

export default connect(mapStateToProps)(SoundControl);