'use strict';

import React from 'react';

class Inner extends React.Component {

    componentDidMount() {
        /**
         * Animation
         */
        var animation = new TimelineLite()
        .from(this.refs.errorCircle, 0.7, {opacity:0, scale:1.2, ease:Linear.easeNone}, "error+=0.3")
        .from(this.refs.stepsContentBottom, 1, {opacity:0, repeat:40, yoyo:true}, "error+=0.7");
    }

    render() {
        let style = {
            display: this.props.isActive ? 'inline' : 'none'
        };

        return <div style={style}>
            <div id="mainblock-header" className="mainblock-header">
                <div className="row">
                    <div className="col-xs-12 menu-item text-center">
                        <h2 className="main-content-header">Пристрiй готовий для змiни електронного ключа</h2>
                    </div>
                </div>
            </div>

            <div className="row vstretch">
                <div className="col-xs-12 vstretch">
                    <div className="steps-content error-content">

                    </div>

                    <div className="steps-box">
                        <img src="/img/box+key_2-step-2.png" alt=""/>
                        <img src="/img/arrow-step-4.gif" className="steps-arrow" alt=""/>

                        <div className="icon-circle icon-circle--148 steps-preload error-circle icon-circle--orange" ref="errorCircle" id="preload-error">
                            <svg id="loading" width='80px' height='80px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-reload">
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
                        Будь ласка, замiнiть електронний ключ
                    </div>
                </div>
            </div>

            <div id="steps-bottom" className="controlblock controlblock-bottom">
                <div className="control-wrapper vstretch">
                    <div className="steps-footer steps-footer-error">
                        У разi втрати або несправностi Вашого електронного ключа, будь ласка,<br/>
                        звернiться до предствника компанії "T-Box"
                    </div>
                </div>
            </div>
        </div>;
    }

}

export default Inner;