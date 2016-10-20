'use strict';

import React from 'react';
import store from '../../store';
import { connect } from 'react-redux';
import Stats from '../../stats';

class FlashAllowed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        }
    }

    componentDidUpdate() {
        if (this.props.isActive && ! this.state.initialized) {
            store.dispatch({
                type: 'RECONNECT_FINISHED'
            });

            /**
             * Animation
             */
            var tlMainMenu = new TimelineLite();
            tlMainMenu.staggerFrom(this.refs.loader, 0.7, {opacity: 0, scale: 1.2, ease: Linear.easeNone}, 0.4, "menublock+=0.3")
            .from(this.refs.loader, 0.7, {opacity:0, scale:1.2, ease:Linear.easeNone}, 0);

            Stats.dispatch('Электронный ключ разрешен');
            this.setState({ initialized: true });

            // Next step
            setTimeout(() => {
                if ( ! this.props.isReconnect) {
                    store.dispatch({
                        type: 'CHANGE_START_PAGE',
                        page: 'Recommends'
                    });
                }
            }, 3000);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.initialized && ! this.props.isActive && nextProps.isActive) {
            // Reinit it
            this.setState({ initialized: false });
        }
    }

    shouldComponentUpdate(nextProps) {
        return (this.props.isActive !== nextProps.isActive);
    }

    render() {
        let style = {
            display: this.props.isActive ? 'inline' : 'none'
        };

        var simple = <div style={style}>
            <div id="mainblock-header" className="container-fluid mainblock-header step3">
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

            <div id="main" className="container-fluid mainblock step3">
                <div className="row vstretch">
                    <div className="col-xs-12 vstretch">
                        <div className="steps-content steps-info">
                            <span>1</span>/2 Ваш електронний ключ підключено
                        </div>
                        <div className="steps-box">
                            <img src="/img/box+key_2-step-2.png" id="box-step-3" alt=""/>

                            <div className="steps-preload icon-circle icon-circle--148" id="svg-loader" ref="loader">
                            <svg className="done icon-ico--148" xmlns="http://www.w3.org/2000/svg" viewBox="-223 346.9 148 148">
                                <style>
                                    {`.done-st0{fill:url(#SVGID_1_);} .done-st1{fill:#FFFFFF;} .done-st2{fill:#6ED139;}`}
                                </style>
                                <linearGradient id="SVGID_1_" x1="-93.995" x2="-190.745" y1="379.95" y2="475.95" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 841.67)">
                                    <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                                    <stop offset="1" stopOpacity=".4"/>
                                </linearGradient>
                                <path d="M-75 428.4v66.5h-34l-49.1-44.6 2.5-2.7-12.7-11.5 7-8 6.7-2 9-9 7.9-9.4 2.8 2.5 6.2-6.2 13-12z" className="done-st0"/>
                                <path id="XMLID_22_" d="M-156 449.7c-.4 0-.9-.2-1.1-.5-4.6-5.4-18.1-19.9-23.7-25.2-.2-.1-.3-.3-.4-.5-.7-1-1.1-2.1-1.1-3.3 0-3.1 2.6-5.7 5.7-5.7 1.2 0 2.4.4 3.3 1.1.1.1.2.1.3.2l13.1 11.8c4.3-4.4 21.4-21.7 38.9-35l.6-.3c.4-.2.8-.2 1.2-.2 1.9 0 3.4 1.5 3.4 3.4 0 .6-.2 1.2-.5 1.7-.1.2-.1.3-.3.4-12.2 14.3-25.4 30.1-38.1 51.4-.2.4-.7.7-1.2.7h-.1z" className="done-st1"/>
                                <path id="XMLID_16_" d="M-119 393.6c1 0 1.9.8 1.9 1.9 0 .4-.1.8-.4 1.1-12.6 14.5-25.8 30.3-38.5 51.6-4.5-5.4-18.1-19.9-23.8-25.3-.6-.7-1-1.7-1-2.7 0-2.3 1.9-4.2 4.2-4.2 1 0 1.9.4 2.7 1l14.2 12.8s19.5-20.5 39.7-35.9c.3-.2.6-.3 1-.3m0-3c-.6 0-1.1.1-1.7.3-.4.1-.8.3-1.1.5-16.5 12.5-32.5 28.5-38.1 34.2l-12.1-10.9c-.2-.2-.4-.3-.6-.4-1.2-.8-2.6-1.3-4.1-1.3-4 0-7.2 3.2-7.2 7.2 0 1.5.5 2.9 1.3 4.1.2.3.4.6.6.8 5.6 5.2 19 19.6 23.6 25 .6.7 1.4 1.1 2.3 1.1h.2c1-.1 1.8-.6 2.3-1.4 12.8-21.2 26-36.9 38.3-51.2.2-.2.4-.5.5-.8.4-.7.6-1.5.6-2.3 0-2.7-2.1-4.9-4.8-4.9z" className="done-st2"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="steps-bottom" className="controlblock controlblock-bottom">
            <div className="control-wrapper vstretch">
                <div className="steps-footer steps-footer-authorisation">
                    Електронний ключ авторизовано
                </div>
            </div>
        </div>

        </div>;
        
        var reconnect = <div style={style}>
            <div id="mainblock-header" className="mainblock-header">
                <div className="row">
                    <div className="col-xs-12 menu-item text-center">
                        <h2 className="main-content-header error-title">Ваш електронний ключ підключено</h2>
                    </div>
                </div>
            </div>

            <div className="row vstretch">
                <div className="col-xs-12 vstretch">
                    <div className="steps-content error-content">
                        {this.props.user.name}
                    </div>
                    
                    <div className="steps-box ">
                        <img src="/img/box+key_2-step-2.png" id="box-step-3" alt=""/>
                        <div className="steps-preload icon-circle icon-circle--148 steps-circle" id="svg-loader" ref="loader">
                            <svg className="done icon-ico--148" id="loaded" xmlns="http://www.w3.org/2000/svg" viewBox="-223 346.9 148 148">
                                <style>
                                    {`.done-st0{fill:url(#SVGID_1_);} .done-st1{fill:#FFFFFF;} .done-st2{fill:#6ED139;}`}
                                </style>
                                <linearGradient id="SVGID_1_" x1="-93.995" x2="-190.745" y1="379.95" y2="475.95" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 841.67)">
                                    <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                                    <stop offset="1" stopOpacity=".4"/>
                                </linearGradient>
                                <path d="M-75 428.4v66.5h-34l-49.1-44.6 2.5-2.7-12.7-11.5 7-8 6.7-2 9-9 7.9-9.4 2.8 2.5 6.2-6.2 13-12z" className="done-st0"/>
                                <path id="XMLID_22_" d="M-156 449.7c-.4 0-.9-.2-1.1-.5-4.6-5.4-18.1-19.9-23.7-25.2-.2-.1-.3-.3-.4-.5-.7-1-1.1-2.1-1.1-3.3 0-3.1 2.6-5.7 5.7-5.7 1.2 0 2.4.4 3.3 1.1.1.1.2.1.3.2l13.1 11.8c4.3-4.4 21.4-21.7 38.9-35l.6-.3c.4-.2.8-.2 1.2-.2 1.9 0 3.4 1.5 3.4 3.4 0 .6-.2 1.2-.5 1.7-.1.2-.1.3-.3.4-12.2 14.3-25.4 30.1-38.1 51.4-.2.4-.7.7-1.2.7h-.1z" className="done-st1"/>
                                <path id="XMLID_16_" d="M-119 393.6c1 0 1.9.8 1.9 1.9 0 .4-.1.8-.4 1.1-12.6 14.5-25.8 30.3-38.5 51.6-4.5-5.4-18.1-19.9-23.8-25.3-.6-.7-1-1.7-1-2.7 0-2.3 1.9-4.2 4.2-4.2 1 0 1.9.4 2.7 1l14.2 12.8s19.5-20.5 39.7-35.9c.3-.2.6-.3 1-.3m0-3c-.6 0-1.1.1-1.7.3-.4.1-.8.3-1.1.5-16.5 12.5-32.5 28.5-38.1 34.2l-12.1-10.9c-.2-.2-.4-.3-.6-.4-1.2-.8-2.6-1.3-4.1-1.3-4 0-7.2 3.2-7.2 7.2 0 1.5.5 2.9 1.3 4.1.2.3.4.6.6.8 5.6 5.2 19 19.6 23.6 25 .6.7 1.4 1.1 2.3 1.1h.2c1-.1 1.8-.6 2.3-1.4 12.8-21.2 26-36.9 38.3-51.2.2-.2.4-.5.5-.8.4-.7.6-1.5.6-2.3 0-2.7-2.1-4.9-4.8-4.9z" className="done-st2"/>
                            </svg>
                        </div>

                    </div>
                    <div className="steps-content-bottom">
                        Будь ласка, виконайте інструкції<br/>
                        для продовження роботи з пристроєм
                    </div>
                </div>
            </div>
            
            <div id="steps-bottom" className="controlblock controlblock-bottom">
                <div className="control-wrapper vstretch">
                    <div className="steps-footer steps-footer-error">
                        Якщо помилка не зникає, перезавантажте пристрій. Якщо перезавантаження не допомогає, <br/>
                        будь-ласка, зверніться до представника компанії «T-Box»
                    </div>
                </div>
            </div>
        </div>;

        return this.props.isReconnect ? reconnect : simple;
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.system.user
    };
};

export default connect(mapStateToProps)(FlashAllowed);