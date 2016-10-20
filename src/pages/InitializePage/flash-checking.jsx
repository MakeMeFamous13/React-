'use strict';

import React from 'react';
import store from '../../store';
import Stats from '../../stats';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        }
    }

    componentDidUpdate() {
        console.log(this.props.isActive, ! this.state.initialized);

        if (this.props.isActive && ! this.state.initialized) {
            /**
             * Animation
             */
            var stepInfo2 = this.refs.stepsInfoStep2;
            var loading = this.refs.loading;

            var tlStep2 = new TimelineLite();
            tlStep2.from(stepInfo2, 1.5, {opacity:0})
            .from(loading, 1, {opacity:0.5, scale:0.5}, 0)
            .from(this.refs.stepsFooterAuthorisation, 1, {opacity:0, repeat:9999, yoyo:true}, 0)
            .from(this.refs.loader, 0.7, {opacity:0, scale:1.2, ease:Linear.easeNone}, 0);

            Stats.dispatch('Проверка электронного ключа');

            this.setState({ initialized: true });

            setTimeout(() => {
                this.makeRequest();
            }, 1000);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.initialized && ! this.props.isActive && nextProps.isActive) {
            // Reinit it
            this.setState({ initialized: false });
        }
    }

    makeRequest() {
        console.log('made request');

        $.get('/init/flash-allowed', function(response) {
            if ( ! response) {
                setTimeout(this.makeRequest, 1000);
                return;
            }

            if (response.status !== 'success') {
                store.dispatch({
                    type: 'CHANGE_START_PAGE',
                    page: 'FlashError'
                });
                return;
            }

            store.dispatch({
                type: 'USER_LOGIN',
                user: response.user
            });

            store.dispatch({
                type: 'CHANGE_START_PAGE',
                page: 'FlashAllowed'
            });
        });
    }

    shouldComponentUpdate(nextProps) {
        return (this.props.isActive !== nextProps.isActive);
    }

    render() {
        let style = {
            display: this.props.isActive ? 'inline' : 'none'
        };

        var simple = <div style={style}>
            <div id="mainblock-header" className="container-fluid mainblock-header step2">
                <div className="row">
                    <div className="col-xs-12 menu-item text-center">
                        <div className="steps-header">
                            <h2>
                                Будь ласка, виконайте інструкції<br/>
                                для продовження роботи з пристроєм
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="main" className="container-fluid mainblock">
                <div className="row vstretch">
                    <div className="col-xs-12 vstretch">
                        <div className="steps-content steps-info" id="steps-info-step-2" ref="stepsInfoStep2">
                            <span>1</span>/2 Ваш електронний ключ підключено
                        </div>
                        
                        <div className="steps-box">
                            <img src="/img/box+key_2-step-2.png" id="box-step-2" alt=""/>
                            <div className="steps-preload icon-circle icon-circle--148 steps-circle" id="svg-loader" ref="loader">
                                <svg id="loading" ref="loading" width='80px' height='80px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-reload">
                                    <rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect>
                                    <g>
                                        <path d="M50 15A35 35 0 1 0 74.787 25.213" fill="none" stroke="#ffffff" strokeWidth="12px"></path>
                                        <path d="M50 0L50 30L66 15L50 0" fill="#ffffff"></path>
                                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"></animateTransform>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="steps-bottom" className="controlblock controlblock-bottom">
                <div className="control-wrapper vstretch">
                    <div className="steps-footer steps-footer-authorisation" ref="stepsFooterAuthorisation">
                        Виконується авторизація, зачекайте будь ласка
                    </div>
                </div>
            </div>
        </div>;
        
        var reconnect = <div style={style}>
            <div id="mainblock-header" className="mainblock-header">
                <div className="row">
                    <div className="col-xs-12 menu-item text-center">
                        <h2 className="main-content-header error-title">Авторизація електронного ключа</h2>
                    </div>
                </div>
            </div>

            <div className="row vstretch">
                <div className="col-xs-12 vstretch">
                    <div className="steps-box" ref="stepsInfoStep2">
                        <img src="/img/box+key_2-step-2.png" id="box-step-2" alt=""/>

                        <div className="steps-preload icon-circle icon-circle--148 steps-circle" id="svg-loader" ref="loader">
                            <svg id="loading" ref="loading" width='80px' height='80px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-reload">
                                <rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect>
                                <g>
                                    <path d="M50 15A35 35 0 1 0 74.787 25.213" fill="none" stroke="#ffffff" strokeWidth="12px"></path>
                                    <path d="M50 0L50 30L66 15L50 0" fill="#ffffff"></path>
                                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"></animateTransform>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="steps-content-bottom">
                        Виконується авторизація, зачекайте будь-ласка
                    </div>
                </div>
            </div>
            
            <div id="steps-bottom" className="controlblock controlblock-bottom">
                <div className="control-wrapper vstretch">
                    <div className="steps-footer steps-footer-error" ref="stepsFooterAuthorisation">
                        Якщо помилка не зникає, перезавантажте пристрій. Якщо перезавантаження не допомогає,
                        <br/>
                        будь-ласка, зверніться до представника компанії «T-Box»
                    </div>
                </div>
            </div>
        </div>;

        return this.props.isReconnect ? reconnect : simple;
    }
}