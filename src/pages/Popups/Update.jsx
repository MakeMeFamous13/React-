'use strict';

import React from 'react';
import store from '../../store';
import keyboard from '../../keyboardEvents';

class Update extends React.Component {
    componentDidMount() {
        var error101 = this.refs.error103Inner;
        //var errorIcon = this.refs.error100Group;
        var errorCircle = this.refs.errorCircle;
        var errorBottom = this.refs.stepsContentBottom;

        var tlError101 = new TimelineLite();
        tlError101.from(error101, 0.7, {scale:0}, "error")
        .from(errorCircle, 0.7, {opacity:0, scale:1.2, ease:Linear.easeNone}, "error+=0.3")
        //.from(errorIcon, 1, {opacity:0.5, scale:0.5}, "error+=0.3")
        .from(errorBottom, 1, {opacity:0, repeat:40, yoyo:true}, "error+=0.7");

        keyboard.keydown({
            enter: () => {
                store.dispatch({
                    type: 'POPUP_HIDE'
                });
            }
        });
    }

    render() {
        return <div id="main" className="container-fluid error101 load">
            <div className="error101-inner" ref="error103Inner">
                <div id="mainblock-header" className="mainblock-header">
                    <div className="row">
                        <div className="col-xs-12 menu-item text-center">
                            <h2 className="main-content-header error-title">Оновлення Бібліотеки</h2>
                        </div>
                    </div>
                </div>

                <div className="row vstretch">
                    <div className="col-xs-12 vstretch">
                        <div className="steps-content error-content">
                            Надійшли нові дані
                        </div>

                        <div className="steps-box error-img">
                            <img src="/img/data.png" alt=""/>

                            <div className="icon-circle icon-circle--148 steps-preload error-circle icon-circle--orange" ref="errorCircle">
                                <svg id="loading" width='80px' height='80px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-reload" ref="error100Group">
                                    <rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect>
                                    <g>
                                        <path d="M50 15A35 35 0 1 0 74.787 25.213" fill="none" stroke="#ffffff" strokeWidth="12px"></path>
                                        <path d="M50 0L50 30L66 15L50 0" fill="#ffffff"></path>
                                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"></animateTransform>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div className="steps-content-bottom" ref="stepsContentBottom">
                            Продовжити роботу з пристроєм
                        </div>
                    </div>
                </div>

                <div id="steps-bottom" className="controlblock controlblock-bottom">
                    <div className="control-wrapper vstretch">
                        <div className="steps-footer steps-footer-error">
                            Оновлення буде виконано в прихованому режимі,<br/>
                            При відмові пристрій автоматично нагадає про оновлення через 1 годину
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Update;