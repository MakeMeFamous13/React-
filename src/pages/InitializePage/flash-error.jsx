'use strict';

import React from 'react';
import store from '../../store';
import { connect } from 'react-redux';
import Stats from '../../stats';

class FlashError extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        }
    }

    componentDidUpdate() {
        if (this.props.isActive && ! this.state.initialized) {
            /**
             * Animation
             */
            var stepInfo4 = this.refs.stepsInfoStep4;
            var authError = this.refs.errorStep4;

            var tlStep4 = new TimelineLite();
            tlStep4.from(stepInfo4, 1.5, {opacity: 0})
            .from(authError, 1, {opacity: 0.5, scale: 0.5}, 0)
            .from(this.refs.stepsFooterStep4, 1, {opacity: 0, repeat: 9999, yoyo: true}, 0)
            .from(this.refs.loader, 0.7, {opacity:0, scale:1.2, ease:Linear.easeNone}, 0);

            Stats.dispatch('Электронный ключ запрещен');

            this.setState({ initialized: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.initialized && ! this.props.isActive && nextProps.isActive) {
            // Reinit it
            this.setState({ initialized: false });
        }

        if (this.state.initialized && this.props.flashConnected && ! nextProps.flashConnected) {
            // Flash has been disconnected
            store.dispatch({
                type: 'CHANGE_START_PAGE',
                page: 'FlashConnected'
            });
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.isActive !== nextProps.isActive;
    }

    render() {
        let style = {
            display: this.props.isActive ? 'inline' : 'none'
        };

        return <div style={style}>
            <div id="mainblock-header" className="container-fluid mainblock-header step4">
                <div className="row">
                    <div className="col-xs-12 menu-item text-center">
                        <div className="steps-header">
                            <h2>
                                Будь ласка, виконайте інструкції<br/>
                                для продовження роботи з пристроем
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="main" className="container-fluid mainblock step4">
                <div className="row vstretch">
                    <div className="col-xs-12 vstretch">
                        <div className="steps-content steps-info" id="steps-info-step-4" ref="stepsInfoStep4">
                            <span>1</span>/2 Помилка авторизації
                        </div>

                        <div className="steps-box">
                            <img src="/img/box+key_2-step-2.png" id="tbox" alt=""/>
                            <img src="/img/arrow-step-4.gif" className="steps-arrow" alt=""/>
                            
                            <div className="steps-preload icon-circle icon-circle--148 steps-circle" id="svg-loader" ref="loader">
                                <svg className="error icon-ico--148" id="error-step-4" ref="errorStep4" xmlns="http://www.w3.org/2000/svg" viewBox="-223 346.9 148 148">
                                    <style>
                                        {`.error-st0{fill:url(#SVGID_1_);} .error-st1{fill:#FFFFFF;} .error-st2{fill:#DA0000;}`}
                                    </style>
                                    <linearGradient id="SVGID_1_" x1="-98.911" x2="-196.411" y1="373.306" y2="471.139" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 841.67)">
                                        <stop offset=".044" stopColor="#020202" stopOpacity="0"/>
                                        <stop offset="1" stopOpacity=".6"/>
                                    </linearGradient>
                                    <path d="M-75 442.3v52.6h-42l-55.8-50.6 6.8-8.4 9.8-9.9.8-16 11-1.8 5 4.1-.1-4.1 13.8-11.3z" className="error-st0"/>
                                    <path id="XMLID_22_" d="M-131.8 445.9c-1.9 0-3.8-.8-5.4-2.4l-11.8-11.8-11.8 11.8c-1.6 1.6-3.4 2.4-5.4 2.4-1.9 0-3.8-.8-5.4-2.4-3.2-3.2-3.2-7.5 0-10.8l11.8-11.8-11.8-11.8c-3.2-3.2-3.2-7.5 0-10.8 1.6-1.6 3.4-2.4 5.4-2.4 1.9 0 3.8.8 5.4 2.4l11.8 11.8 11.8-11.8c1.6-1.6 3.4-2.4 5.4-2.4 1.9 0 3.8.8 5.4 2.4 3.2 3.2 3.2 7.5 0 10.8l-11.8 11.8 11.8 11.8c3.2 3.2 3.2 7.5 0 10.8-1.6 1.6-3.5 2.4-5.4 2.4z" className="error-st1"/>
                                    <path id="XMLID_11_" d="M-131.8 397.4c1.5 0 3 .6 4.3 2 2.7 2.7 2.6 6 0 8.6l-12.9 12.9 12.9 12.9c2.7 2.7 2.6 6 0 8.6-1.3 1.3-2.8 2-4.3 2s-3-.6-4.3-2l-12.9-12.9-12.9 12.9c-1.3 1.3-2.8 2-4.3 2s-3-.6-4.3-2c-2.7-2.7-2.6-6 0-8.6l12.9-12.9-12.9-12.9c-2.7-2.7-2.6-6 0-8.6 1.3-1.3 2.8-2 4.3-2s3 .6 4.3 2l12.9 12.9 12.9-12.9c1.3-1.3 2.8-2 4.3-2m0-3c-2.4 0-4.6 1-6.4 2.8L-149 408l-10.8-10.7c-1.9-1.9-4.1-2.8-6.4-2.8-2.4 0-4.6 1-6.4 2.8-3.8 3.8-3.8 9.1 0 12.9l10.7 10.7-10.7 10.8c-3.8 3.8-3.8 9.1 0 12.9 1.9 1.9 4.1 2.8 6.4 2.8 2.4 0 4.6-1 6.4-2.8l10.8-10.8 10.8 10.8c1.9 1.9 4.1 2.8 6.4 2.8 2.4 0 4.6-1 6.4-2.8 3.8-3.8 3.8-9.1 0-12.9l-10.7-10.8 10.8-10.8c3.8-3.8 3.8-9.1 0-12.9-1.9-1.8-4.1-2.8-6.5-2.8z" className="error-st2"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="steps-bottom" className="controlblock controlblock-bottom">
                <div className="control-wrapper vstretch">
                    <div className="steps-footer steps-footer-authorisation" ref="stepsFooterStep4">
                        Будь ласка, витягніть і повторно підключіть електронний ключ
                    </div>
                </div>
            </div>

        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        flashConnected: store.system.flashConnected
    };
};

export default connect(mapStateToProps)(FlashError);