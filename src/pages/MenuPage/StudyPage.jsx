'use strict';

import React from 'react';
import store from '../../store';
import KeyboardMixin from './keyboardMixin.jsx';

class IconPreparings extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div className="icon-circle icon-circle--148 circle-main" ref="menuBlockIconCircle">
            <svg className="study icon-ico--148 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="-231 323 148 148" ref="svg">
                <style>
                    {`.study-st0{fill:url(#XMLID_2_);} .study-st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;} .study-st2{fill:#0066D9;}`}
                </style>
                <linearGradient id="XMLID_2_" x1="-104.458" x2="-195.208" y1="437.284" y2="344.784" gradientUnits="userSpaceOnUse">
                    <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                    <stop offset="1" stopOpacity=".4"/>
                </linearGradient>
                <path id="XMLID_24_" d="M-83 403v68h-36.8l-47.5-41.6 6.9-7.5 2-2.3-1.8-6.3-3-8.7 9.1-3.4-12.1-10.8-2.6-8.6 7.4-3.2-3-6.1 3.5-1.1 6.1-7.6 22.3 15.4 3.6-5.6 4-2.5z" className="study-st0"/>
                <path d="M-161.8 430.1c-4.1 0-6.2-3.5-6.7-5.3v-.2c0-.1-.9-10.1-1.1-14.9-.1-2.2-.3-2.9-.3-3.1-.1 0-.2-.1-.3-.1-.3-.1-.5-.2-.9-.3-2.2-1-2.7-3.5-2.7-4.9 0-.7-.3-8.1-.8-14.7-.2-2.3.4-4.3 1.8-5.8 2.4-2.6 6.3-2.8 7.1-2.8h1.1l.2.6c.2-.2.5-.6 1-.7-2.8-1.2-4.7-3.9-4.7-7.1 0-4.2 3.5-7.7 7.7-7.7s7.7 3.5 7.7 7.7c0 3.1-1.9 5.8-4.6 7 .7.1 1 .5 1.2.7l.2-.6h1.1c.4 0 2.3 0 4.2.9 1 .4 1.6 1.4 2.1 2.2.2.3.4.6.5.8.9 1.1 3.9 5.3 5 6.8l3.5.4h.5c2.8-4.2 10.5-15.5 10.8-16 .5-.8 1.1-1 1.6-1 .8 0 1.5.6 1.7 1.5l.1.5-8.8 17.2c.5.7.8 1.6.8 2.5 0 1.8-.5 3.1-1.5 4-.9.8-2.1 1.1-3.7 1.1-.7 0-1.6-.1-2.7-.2l-2-.3c-3.8-.5-4.6-.7-5.2-.9-1-.5-1.8-1.5-1.9-1.7l-.3-.4c-.3 4.8-.9 12.2-.9 13.7-.2 4.8-1.2 14.9-1.3 15.3v.2c-.5 1.8-2.6 5.3-6.7 5.3h-2.8z" className="study-st1"/>
                <path d="M-160.4 364.5c3.4 0 6.2 2.8 6.2 6.2 0 3.4-2.8 6.2-6.2 6.2-3.4 0-6.2-2.8-6.2-6.2.1-3.4 2.8-6.2 6.2-6.2m33.9 9.1c.2 0 .2.3.2.3l-9 17.7c.6.5 1.1 1.2 1.1 2.3 0 2.8-1.4 3.6-3.7 3.6-.7 0-1.6-.1-2.5-.2-4.3-.6-6.3-.9-6.7-1.1-.7-.4-1.4-1.2-1.4-1.2l-2.7-3.7s-1.1 15.7-1.2 17.9c-.2 4.9-1.3 15.2-1.3 15.2s-1.2 4.2-5.3 4.2h-2.8c-4.1 0-5.3-4.2-5.3-4.2s-.8-10-1.1-14.9c-.2-4.9-.7-4.1-2.4-4.9-1.9-.9-1.8-3.5-1.8-3.5s-.2-7.7-.8-14.8c-.5-6.8 6.9-6.9 7.4-6.9l2.8 8.9.9-4.4s-.1-.5.5-.5h2.6c.6 0 .5.5.5.5l.9 4.4 2.8-8.9c.2 0 1.9 0 3.6.8.9.4 1.4 1.7 2.1 2.6 1 1.3 5.3 7.3 5.3 7.3l4.2.5h.3c.2 0 .6 0 1.1.1 1.8-2.7 11-16.1 11.3-16.7l.4-.4m-31.2 5.6c1 0 .4.9.4.9l-.9 1.8s-.1.7-.7.7h-2.6c-.6 0-.7-.7-.7-.7l-.9-1.8s-.6-.9.4-.9h5m-2.7-17.7c-5.1 0-9.2 4.1-9.2 9.2 0 2.2.8 4.2 2.1 5.8-1.8.3-4.5 1-6.4 3.1-1.1 1.2-2.5 3.4-2.2 6.9.5 6.5.7 13.7.8 14.6-.1 1.8.6 4.9 3.5 6.2.2.1.3.1.5.2 0 .4.1 1 .1 2.1.2 4.9 1 14.6 1.1 15v.3l.1.3c.6 2.2 3.2 6.4 8.2 6.4h2.8c5 0 7.5-4.2 8.2-6.4l.1-.2v-.3c0-.4 1.1-10.5 1.3-15.4 0-1.1.4-6.1.7-10.5.1 0 .2.1.3.1.8.4 1.6.5 5.6 1.1l2 .3c1.2.2 2.1.2 2.9.2 4.2 0 6.7-2.4 6.7-6.6 0-.9-.2-1.8-.6-2.6l8.2-16.1.4-.9-.2-1c-.3-1.6-1.6-2.8-3.2-2.8-.7 0-1.9.2-2.8 1.6-.3.4-5.4 7.9-10.4 15.3l-2.4-.3c-1.3-1.8-3.8-5.3-4.6-6.3-.1-.1-.3-.4-.4-.7-.6-.9-1.3-2.2-2.8-2.8-1.2-.5-2.4-.8-3.3-.9 1.3-1.6 2.1-3.6 2.1-5.8 0-5-4.1-9.1-9.2-9.1z" className="study-st2"/>
            </svg>
        </div>;
    }
}

class IconSystem extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div className="icon-circle icon-circle--148 circle-main" ref="menuBlockIconCircle">
            <svg className="system icon-ico--148 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="-231 323 148 148" ref="svg">
                <style>
                    {`.system-st0{fill:url(#XMLID_2_);} .system-st1{fill:#FFFFFF;} .system-st2{fill:#0066D9;}`}
                </style>
                <linearGradient id="XMLID_2_" x1="-107.584" x2="-208.802" y1="437.655" y2="337.133" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 4)">
                    <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                    <stop offset="1" stopOpacity=".4"/>
                </linearGradient>
                <path id="XMLID_24_" d="M-83 406.7V471h-50l-60.6-55.4 3.6-5.3 3.2 4.5 3.7-2.6-2.6-10.4.9-6.4-1.4-13.6-.8-6.2 6.3 2 10.7-3.3 9-3-1.5-1.4 17.8 3.3 2-14.4z" className="system-st0"/>
                <path id="XMLID_3_" d="M-127.5 410.6c-2.3-6.8.7-14.2 6.9-17.6 1.4-.8 2.1-2.4 1.6-3.9l-2.9-8.8c-.5-1.6-2.1-2.4-3.7-2.2-1.6.2-3.2.2-4.9-.2-7.2-1.4-12-7.9-11.8-15 0-1.5-1-2.7-2.4-3l-9.7-2c-1.4-.3-2.8.5-3.2 1.8-.6 1.6-1.5 3.2-2.7 4.6-4.7 5.3-12.5 6.4-18.5 3-1.5-.9-3.4-.6-4.5.7l-6 6.8c-1.1 1.2-1.1 3-.1 4.2 1 1.3 1.8 2.7 2.4 4.4 2.3 6.7-.6 13.9-6.5 17.4-1.6.9-2.3 2.9-1.7 4.7l2.7 7.9c.5 1.6 2.1 2.7 3.8 2.5 1.6-.2 3.2-.2 4.8.2 7.1 1.4 11.9 7.8 11.8 14.8 0 1.5 1 2.8 2.5 3.1l9.5 1.9c1.4.3 2.8-.5 3.4-1.9.6-1.6 1.5-3.1 2.7-4.4 4.7-5.3 12.4-6.4 18.4-3 1.6.9 3.5.5 4.7-.9l5.6-6.4c1.1-1.3 1.3-3.2.2-4.5-1.1-1.1-1.9-2.6-2.4-4.2m-32.9 1.8c-8.5-1.7-14-10-12.3-18.5s10-14 18.5-12.3 14 10 12.3 18.5c-1.7 8.5-10 14-18.5 12.3" className="system-st1"/>
                <path id="XMLID_7_" d="M-159.6 438c-.3 0-.7 0-1-.1l-9.5-1.9c-2.4-.5-4.1-2.7-4.1-5.1.1-6.2-4.1-11.6-10.2-12.8-1.4-.3-2.8-.3-4.2-.1-2.6.3-5.1-1.3-6-3.8l-2.7-7.9c-.9-2.7.2-5.6 2.5-7 5.2-3.1 7.5-9.4 5.6-15-.5-1.4-1.1-2.6-2-3.8-1.6-2-1.5-4.9.1-6.8l6-6.8c1.7-2 4.7-2.4 7-1.1 5.3 3 12 2 16-2.6 1-1.2 1.8-2.5 2.4-3.9.8-2.3 3.2-3.6 5.5-3.1l9.7 2c2.4.5 4.1 2.6 4 5.1-.2 6.3 4.1 11.7 10.2 13 1.4.3 2.8.3 4.2.1 2.6-.4 5.1 1.1 5.9 3.6l2.9 8.8c.8 2.4-.2 5-2.5 6.3-5.4 3-7.9 9.4-5.9 15.2.5 1.3 1.1 2.6 2 3.7 1.6 2.1 1.5 5.1-.3 7.1l-5.6 6.4c-1.8 2.1-4.9 2.6-7.2 1.3-5.2-3-11.9-1.9-15.9 2.6-1 1.1-1.8 2.4-2.3 3.8-.8 1.6-2.6 2.8-4.6 2.8zm-27.3-24.2c1.1 0 2.2.1 3.3.3 7.9 1.6 13.6 8.7 13.4 16.8 0 .6.4 1 .9 1.1l9.5 1.9c.5.1.9-.2 1.1-.6.7-1.8 1.7-3.5 3.1-5 5.2-5.9 14-7.4 20.9-3.4.7.4 1.7.2 2.2-.5l5.6-6.4c.5-.6.6-1.4.1-2-1.1-1.5-2-3.1-2.6-4.9-2.6-7.6.7-16 7.8-20 .6-.3.8-.9.6-1.5l-2.9-8.8c-.2-.6-.8-1-1.5-.9-1.9.3-3.7.2-5.6-.2-8-1.6-13.7-8.8-13.4-17 0-.5-.3-.9-.8-1l-9.7-2c-.4-.1-.8.1-1 .6-.7 1.9-1.8 3.7-3.1 5.2-5.3 5.9-14.1 7.4-21 3.4-.7-.4-1.5-.3-2 .3l-6 6.8c-.4.5-.4 1.1 0 1.7 1.2 1.5 2.1 3.2 2.7 5 2.5 7.4-.6 15.7-7.4 19.7-.8.4-1.1 1.4-.8 2.3l2.7 7.9c.2.7 1 1.2 1.7 1.1.7.1 1.4.1 2.2.1zm29.6.9c-1.2 0-2.3-.1-3.5-.4-9.6-1.9-15.8-11.3-13.8-20.8.9-4.6 3.6-8.6 7.6-11.2 3.9-2.6 8.7-3.5 13.3-2.6s8.6 3.6 11.2 7.6 3.5 8.6 2.5 13.2c-1.7 8.4-9.1 14.2-17.3 14.2zm-2.7-4.3c7.4 1.5 14.6-3.3 16.1-10.7.7-3.6 0-7.2-2-10.3s-5.1-5.1-8.7-5.9c-3.6-.7-7.2 0-10.3 2-3 2-5.1 5.1-5.9 8.7-1.4 7.5 3.4 14.7 10.8 16.2z" className="system-st2"/>
            </svg>
        </div>;
    }
}

class IconRemote extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div className="icon-circle icon-circle--148 circle-main" ref="menuBlockIconCircle">
            <svg className="remote icon-ico--148 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148 148" ref="svg">
                <style>
                    {`.remote-st0{fill-rule:evenodd;clip-rule:evenodd;fill:url(#XMLID_8_);} .remote-st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;} .remote-st2{fill:#0066D9;}`}
                </style>
                <linearGradient id="XMLID_8_" x1="124.005" x2="32.151" y1="123.067" y2="31.843" gradientUnits="userSpaceOnUse">
                    <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                    <stop offset="1" stopOpacity=".4"/>
                </linearGradient>
                <path id="XMLID_24_" d="M148 99.6V148h-41.9l-46.9-42 2.4-13.9.8-25 8.4.2L60 56l2.7-3.8 22.8-1.6 2.3 1z" className="remote-st0"/>
                <path id="XMLID_20_" d="M63.4 106.8c-2.8 0-5-2.2-5-5V69.2c0-2.8 2.2-5 5-5h21.3c2.8 0 5 2.2 5 5v32.6c0 2.8-2.2 5-5 5H63.4zm.7-37.3c-.2 0-.3.1-.3.3v31.3c0 .2.1.3.3.3h20c.2 0 .3-.1.3-.3V69.9c0-.2-.1-.3-.3-.3h-20zm10 14.8c-3.1 0-5.7-2.5-5.7-5.7s2.5-5.7 5.7-5.7 5.7 2.5 5.7 5.7-2.6 5.7-5.7 5.7zm3.6-20.4c-.5 0-.9-.1-1.3-.4-.7-.5-1.6-.7-2.4-.7s-1.7.3-2.4.7c-.4.2-.8.4-1.3.4-.6 0-1.2-.2-1.6-.7-.5-.5-.8-1.2-.7-1.9.1-.7.5-1.3 1.1-1.7 1.5-1 3.2-1.5 5-1.5s3.5.5 5 1.5c.6.4 1 1 1.1 1.7.1.7-.2 1.4-.7 1.9-.6.4-1.1.7-1.8.7zm3.9-3.8c-.5 0-1.1-.2-1.5-.5-1.7-1.4-3.8-2.1-6.1-2.1-2.2 0-4.4.7-6.1 2.1-.4.3-.9.5-1.5.5s-1.2-.2-1.6-.7c-.5-.5-.7-1.1-.7-1.8s.3-1.3.9-1.7c2.6-2.1 5.7-3.1 9-3.1s6.5 1.1 9 3.1c.5.4.8 1 .9 1.7 0 .7-.2 1.3-.7 1.8-.4.4-1 .7-1.6.7zm-19-3.8c-.6 0-1.2-.2-1.6-.7-.5-.5-.7-1.1-.7-1.8s.3-1.3.8-1.7c1.6-1.3 3.3-2.4 5.2-3.2 2.4-1 5-1.5 7.7-1.5s5.3.5 7.7 1.5c1.9.8 3.6 1.9 5.2 3.2.5.4.8 1 .8 1.7s-.2 1.3-.7 1.8c-.4.4-1 .7-1.6.7-.6 0-1.1-.2-1.5-.6-2.7-2.3-6.2-3.6-9.9-3.6-3.6 0-7.1 1.3-9.9 3.6-.4.4-.9.6-1.5.6z" className="remote-st1"/>
                <path id="XMLID_2_" d="M74 48.5c2.5 0 5 .5 7.3 1.5 1.8.8 3.4 1.8 4.9 3 .6.5.6 1.4.1 2-.3.3-.6.4-.9.4-.3 0-.6-.1-.9-.3-2.9-2.5-6.6-3.8-10.5-3.8-3.9 0-7.6 1.4-10.5 3.8-.3.2-.6.3-.9.3-.3 0-.7-.1-.9-.4-.6-.5-.5-1.5.1-2 1.5-1.3 3.1-2.3 4.9-3 2.3-1 4.8-1.5 7.3-1.5m0 5.3c3.1 0 6 1 8.4 2.9.6.5.6 1.4.1 2-.3.3-.6.4-.9.4-.3 0-.6-.1-.9-.3-1.9-1.5-4.2-2.3-6.7-2.3s-4.8.8-6.7 2.3c-.3.2-.6.3-.9.3-.3 0-.7-.1-.9-.4-.6-.6-.5-1.5.1-2 2.4-1.9 5.3-2.9 8.4-2.9m0 5.3c1.6 0 3.1.5 4.4 1.3.7.5.8 1.5.2 2.1-.3.3-.6.4-.9.4-.2 0-.5-.1-.7-.2-.9-.6-1.9-.9-3-.9s-2.1.3-3 .9c-.2.1-.5.2-.7.2-.3 0-.7-.1-.9-.4-.6-.6-.5-1.6.2-2.1 1.3-.8 2.8-1.3 4.4-1.3m10.7 6.1c2.2 0 4 1.8 4 4v32.6c0 2.2-1.8 4-4 4H63.4c-2.2 0-4-1.8-4-4V69.2c0-2.2 1.8-4 4-4h21.3m-20.6 37.3h20c.7 0 1.3-.6 1.3-1.3V69.9c0-.7-.6-1.3-1.3-1.3h-20c-.7 0-1.3.6-1.3 1.3v31.3c-.1.7.5 1.3 1.3 1.3m10-28.5c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7M74 46.5c-2.8 0-5.5.5-8.1 1.6-2 .8-3.8 2-5.4 3.3-.7.6-1.1 1.5-1.2 2.4 0 .9.3 1.8 1 2.5.6.6 1.5 1 2.3 1h.5v.3c-.1 1 .3 1.9 1 2.6.6.6 1.5 1 2.3 1h.6v.2c-.1.7.1 1.4.4 2h-4c-3.3 0-6 2.7-6 6V102c0 3.3 2.7 6 6 6h21.3c3.3 0 6-2.7 6-6V69.2c0-3.3-2.7-6-6-6h-4.1c.3-.6.5-1.3.4-2V61h.6c.9 0 1.7-.3 2.3-1 .7-.7 1-1.6 1-2.6v-.3h.5c.9 0 1.7-.3 2.3-.9.7-.7 1-1.6 1-2.5 0-.9-.5-1.8-1.2-2.4-1.6-1.4-3.5-2.5-5.4-3.3-2.5-1-5.3-1.5-8.1-1.5zm-9.3 24h18.7v29.9H64.7V70.5zm9.4 1.5c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7 6.7-3 6.7-6.7c-.1-3.7-3.1-6.7-6.7-6.7z" className="remote-st2"/>
            </svg>
        </div>;
    }
}

class StudyPage extends React.Component {
    componentDidMount() {
        /**
         * Animation
         */
        let menuBlock = this.props.list.map((item, i) => {
            return this.refs['menuBlock'+i];
        });

        let menuBlockIconCircle = this.props.list.map((item, i) => {
            return this.refs['menuBlockIcon'+i].refs.menuBlockIconCircle;
        });

        let menuBlockIcon = this.props.list.map((item, i) => {
            return this.refs['menuBlockIcon'+i].refs.svg;
        });

        let menuBlockTitle = this.props.list.map((item, i) => {
            return this.refs['menuBlockTitle'+i];
        });

        let menuBlockDesc = this.props.list.map((item, i) => {
            return this.refs['menuBlockDesc'+i];
        });

        var tlMainMenu = new TimelineLite();
        tlMainMenu.staggerFrom(menuBlock, 0.7, {opacity:0, scale:0.65, ease:Linear.easeNone}, 0.4, "menublock")
        .staggerFrom(menuBlockIconCircle, 0.7, {opacity:0, scale:1.2, ease:Linear.easeNone}, 0.4, "menublock+=0.3")
        .staggerFrom(menuBlockIcon, 0.7, {opacity:0.5, scale:0.5, ease:Linear.easeNone}, 0.4, "menublock+=0.3")
        .staggerFrom(menuBlockTitle, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "menublock+=0.3")
        .staggerFrom(menuBlockDesc, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "menublock+=0.3");
    }

    render () {
        const buttons = this.props.list.map((item, i) => {
            const Icon = item.icon;
            const className = 'menu-block menu-block__main';

            return <div key={i} className={className} ref={'menuBlock'+i}>
                <Icon ref={'menuBlockIcon'+i}/>
                <div className="menu-block__title" ref={'menuBlockTitle'+i}>{item.name}</div>
                <div className="menu-block__description" ref={'menuBlockDesc'+i}>{item.caption}</div>
            </div>;
        });

        return <div className="wrapper__main-menu">
            <div className="main-menu__header">
                <h2 className="main-menu__title">Розділи</h2>
            </div>

            <KeyboardMixin
                dispatchAction={(item) => {
                    if ( !! item.func) {
                        // Execute page func
                        item.func();
                    }
                }}
                list={this.props.list}
                bodyClass="main-menu__body"
                buttons={buttons}
            />
        </div>;
    }
}

StudyPage.defaultProps = {
    list: [
        {
            id: 0,
            name: 'Відеоінструкції',
            icon: IconPreparings,
            caption: 'для проведення уроків',
            func: () => {
                store.dispatch({
                    type: 'POPUP_VIDEO_SHOW'
                });
            }
        },

        {
            id: 1,
            name: 'Система',
            icon: IconSystem,
            caption: 'Покрокові інструкції для користування системою',
            func: () => {
                store.dispatch({
                    type: 'POPUP_STUDY_SYSTEM_SHOW'
                });
            }
        },

        {
            id: 2,
            name: 'Пульт ДУ',
            icon: IconRemote,
            caption: 'Інструкція користування дистанційним пультом керування',
            func: () => {
                store.dispatch({
                    type: 'POPUP_TUTORIAL_SHOW'
                });
            }
        },
    ]
};

export default StudyPage;