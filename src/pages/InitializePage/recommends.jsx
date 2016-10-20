'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import keyboard from '../../keyboardEvents';

export default class extends React.Component {
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
            var stepInfo7 = this.refs.stepsInfo;
            var proectorInstHeader = this.refs.instructionblockHeader;
            var proectorInst = [this.refs.instructionblockItem1, this.refs.instructionblockItem2, this.refs.instructionblockItem3];
            var proector = this.refs.proector;
            var dust = this.refs.proectorblockDust;
            var cleaner = this.refs.proectorblockHand;

            var tlStep7 = new TimelineLite();
            tlStep7.from(stepInfo7, 1.5, {opacity: 0})
            .from(proector, 2, {x: 1000, opacity: 0})
            .from(proectorInstHeader, 1, {opacity: 0}, "-=1.5")
            .staggerFrom(proectorInst, 1, {opacity: 0}, 0.5)
            .from(cleaner, 1, {opacity: 0, x: -250}, "-=1.5")
            .to(cleaner, 1.5, {bezier: {curviness: 1.5, values: [{x: -90, y: -90}, {x: -180, y: 0}, {x: -90, y: 90}, {x: 0, y: 0}]}/*bezier end*/, ease: Linear.easeNone, repeat: 1})
            .to(dust, 2, {opacity: 0}, "-=2");

            this.keyboardEvents = keyboard.keydown({
                enter: () => {
                    var stepsHeader = this.refs.stepsHeader;
                    var stepsInfo = this.refs.stepsInfo;

                    // Fade out animation
                    tlStep7.stop();

                    var fadeOut = new TimelineLite();
                    fadeOut
                    .to([stepsHeader, stepsInfo, proector, proectorInstHeader, proectorInst, cleaner], 1, {opacity:0})
                    .eventCallback('onComplete', () => {
                        // Go to Login page
                        routerHistory.push('/login');
                    });
                }
            });

            this.setState({ initialized: true });
        }
        else if (this.state.initialized && ! this.props.isActive) {
            this.keyboardEvents();
            this.setState({ initialized: false });
        }
    }

    componentWillUnmount() {
        this.keyboardEvents();
        this.setState({ initialized: false });
    }

    shouldComponentUpdate(nextProps) {
        return this.props.isActive !== nextProps.isActive;
    }

    render() {
        let style = {
            display: this.props.isActive ? 'inline' : 'none'
        };

        return <div style={style}>
            <div className="wrapper">
                <div id="mainblock-header" className="container-fluid mainblock-header step7">
                    <div className="row">
                        <div className="col-xs-12 menu-item text-center">
                            <div className="steps-header" ref="stepsHeader">
                                <h2>
                                    Будь ласка, виконайте інструкції<br/>
                                    для продовження роботи з пристроем
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="main" className="container-fluid mainblock">
                    <div className="row vstretch">
                        <div className="col-xs-12 vstretch">
                            <div className="steps-content steps-info" id="steps-info-step-7" ref="stepsInfo">
                                <span>2</span>/2 Рекомендуємо оглянути лінзу проектора
                            </div>
                            <div className="instructionblock">
                                <div className="instructionblock-header" ref="instructionblockHeader">
                                    Інструкції:
                                </div>
                                <ul className="instructionblock-steps">
                                    <li className="instructionblock-item" ref="instructionblockItem1">Використовувати лише фірмову мікрофібру "T-Box"</li>
                                    <li className="instructionblock-item" ref="instructionblockItem2">Перевірити наявність мікрочасток на поверхні мікрофібри</li>
                                    <li className="instructionblock-item" ref="instructionblockItem3">Протирати об'єктив круговими рухами</li>
                                </ul>
                            </div>
                            <div className="proectorblock">
                                <div id="proector" ref="proector">
                                    <img className="proectorblock-proector" src="/img/proector.png" alt=""/>
                                    <img className="proectorblock-dust" ref="proectorblockDust" src="/img/lens-dust.png" alt=""/>
                                </div>

                                <img className="proectorblock-hand" ref="proectorblockHand" src="/img/hand-cleaning.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="wrapper-navmain">
                <div id="controlblock-top" className="navmain navmain--top">
                    <div className="navmain__left-bar">

                    </div>

                    <div className="navmain__right-bar">
                        <div id="btn-enter" className="control-element">
                            Продовжити <img src="/img/btn-green-enter.png" alt="Menu"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}