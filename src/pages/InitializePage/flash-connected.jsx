'use strict';

import React from 'react';
import store from '../../store';
import { connect } from 'react-redux';
import Stats from '../../stats';

class FlashConnected extends React.Component {
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
            var stepsHeader = this.refs.stepsHeaderStep1;
            var stepsInfo = this.refs.stepsInfoStep1;
            var tBox = this.refs.tboxStep1;
            var flashDrive = this.refs.keyStep1;
            var arrow = this.refs.arrowStep1;
            var stepsFooter1 = this.refs.stepsFooterStep1;

            var tlStep1 = new TimelineLite();

            if ( ! this.props.isReconnect) {
                tlStep1.from(stepsHeader, 1.5, {opacity: 0})
                .from(stepsInfo, 1.5, {opacity: 0}, "footer")
                .from(tBox, 1, {scale: 0, ease: Bounce.easeOut})
                .from(flashDrive, 1, {scale: 0, ease: Bounce.easeOut});
            }

            tlStep1.from(flashDrive, 1, {x:-45, y:30, yoyo:true, repeat:9999}, "flashDrive");

            if ( ! this.props.isReconnect) {
                tlStep1
                .from(arrow, 1, {opacity: 0}, "flashDrive")
                .from(stepsFooter1, 1.5, {opacity: 0}, "footer+=1");
            }

            Stats.dispatch('Ожидание электронного ключа');
            this.setState({ initialized: true });

            this.timer = setTimeout(() => {
                if (this.props.flashConnected) {
                    this.goNext();
                }
            }, 6000);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.initialized && ! this.props.isActive && nextProps.isActive) {
            // Reinit it
            this.setState({ initialized: false });
        }

        if (this.props.isActive
            && ! this.props.flashConnected
            && nextProps.flashConnected) {
            this.goNext();
        }
    }

    goNext() {
        clearTimeout(this.timer);

        // Next step
        store.dispatch({
            type: 'CHANGE_START_PAGE',
            page: 'FlashChecking'
        });
    }

    render() {
        let style = {
            display: this.props.isActive ? 'inline' : 'none'
        };

        var simple = <div style={style}>
            <div id="mainblock-header" className="container-fluid mainblock-header step1">
                <div className="row">
                    <div className="col-xs-12 menu-item text-center">
                        <div className="steps-header" id="steps-header-step-1" ref="stepsHeaderStep1">
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
                        <div className="steps-content steps-info" id="steps-info-step-1" ref="stepsInfoStep1">
                            <span>1</span>/2 Підключіть Ваш особистий електронний ключ
                        </div>
                        
                        <div className="steps-box">
                            <img src="/img/Box+shadow.png" id="tbox-step-1" ref="tboxStep1" alt=""/>
                            <img src="/img/arrow-step-1.gif" id="arrow-step-1" ref="arrowStep1" className="steps-arrow" alt=""/>
                            <img src="/img/crypto-key-2.png" id="key-step-1" ref="keyStep1" className="steps-key" alt=""/>
                        </div>
                    </div>
                </div>
            </div>

            <div id="steps-bottom" className="controlblock controlblock-bottom">
                <div className="control-wrapper vstretch">
                    <div className="steps-footer steps-footer-step-1" ref="stepsFooterStep1">
                        У разі втрати або несправності Вашого електронного ключа, будь ласка,<br/>
                        зверніться до представника компанії "T-Box"
                    </div>
                </div>
            </div>

        </div>;
        
        var reconnect = <div style={style}>
            <div id="mainblock-header" className="mainblock-header">
                <div className="row">
                    <div className="col-xs-12 menu-item text-center" ref="stepsHeaderStep1">
                        <h2 className="main-content-header error-title">Підключить Ваш особистий електронний ключ</h2>
                    </div>
                </div>
            </div>

            <div className="row vstretch">
                <div className="col-xs-12 vstretch">
                    <div className="steps-box">
                        <img src="/img/Box+shadow.png" id="tbox-step-1" ref="tboxStep1" alt=""/>
                        <img src="/img/arrow-step-1.gif" id="arrow-step-1" ref="arrowStep1" className="steps-arrow" alt=""/>
                        <img src="/img/crypto-key-2.png" id="key-step-1" ref="keyStep1" className="steps-key" alt=""/>
                    </div>
                    <div className="steps-content-bottom" ref="stepsInfoStep1">
                        Будь ласка, виконайте інструкції<br/>
                        для продовження роботи з пристроєм
                    </div>
                </div>
            </div>
            
            <div id="steps-bottom" className="controlblock controlblock-bottom">
                <div className="control-wrapper vstretch">
                    <div className="steps-footer steps-footer-error" ref="stepsFooterStep1">
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
        flashConnected: store.system.flashConnected
    };
};

export default connect(mapStateToProps)(FlashConnected);