'use strict';

import React from 'react';
import KeyboardMixin from './keyboardMixin.jsx';

const IconLessons = React.createClass({
    shouldComponentUpdate: function() {
        return false;
    },

    render: function() {
        return <svg className="lesson icon-ico--148 menu-icon" ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="-223 346.9 148 148">
            <style>
                {`.lesson-st0{fill:url(#_x33__1_);} .lesson-st1{fill:#0066D9;} .lesson-st2{fill:#FFFFFF;}`}
            </style>
            <linearGradient id="_x33__1_" x1="-99.006" x2="-196.506" y1="373.397" y2="469.647" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 841.67)">
                <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                <stop offset="1" stopOpacity=".4"/>
            </linearGradient>
            <path id="_x33_" d="M-75 429.9v65h-56.1l-48.3-43.9 7-8 10-10 2.1-2.6-8.1-7.4 13-13 7.8-9.5 9 8.1 6.3-6.4 13-12z" className="lesson-st0"/>
            <path id="_x32_" d="M-117 414.9v-20c0-3.3-2.7-6-6-6h-20c-3.3 0-6 2.7-6 6 0-3.3-2.7-6-6-6h-20c-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6-3.3 0-6 2.7-6 6v20c0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6 0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6v-20c0-3.3-2.7-6-6-6 3.3 0 6-2.7 6-6zm-32 12c0-3.3-2.7-6-6-6 3.3 0 6-2.7 6-6 0 3.3 2.7 6 6 6-3.3 0-6 2.7-6 6z" className="lesson-st1"/>
            <path id="_x31_" d="M-125 392.9h-16c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zm0 20h-16v-16h16v16zm-32 12h-16c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zm0 20h-16v-16h16v16zm32-20h-16c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zm0 20h-16v-16h16v16zm-32-52h-16c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zm0 20h-16v-16h16v16z" className="lesson-st2"/>
        </svg>;
    }
});

const IconLibrary = React.createClass({
    shouldComponentUpdate: function() {
        return false;
    },

    render: function() {
        return <svg className="library icon-ico--148 menu-icon" ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="-223 346.9 148 148">
            <style>
                {`.library-st0{fill:url(#SVGID_1_);} .library-st1{fill:#0066D9;} .library-st2{fill:#FFFFFF;}`}
            </style>
            <linearGradient id="SVGID_1_" x1="-98.74" x2="-195.489" y1="374.661" y2="470.911" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 841.67)">
                <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                <stop offset="1" stopOpacity=".4"/>
            </linearGradient>
            <path d="M-75 420.6v74.3h-62.7l-39.5-35.9 6.9-8 10.1-10 5-6.1-13.2-11.9 13-13 7.8-9.5 2.8 2.5 1.2-1.2 10-10 13-12z" className="library-st0"/>
            <path id="XMLID_3_" d="M-125.5 377.8h-47c-3.9 0-7 3.1-7 7v69c0 3.9 3.1 7 7 7h4.7c1 .9 2.7 2 3.9 2 1.6 0 2.7-1.1 3.4-2h4.3c.7.9 1.8 2 3.4 2 1.7 0 3.1-.8 4-2h23.4c3.9 0 7-3.1 7-7v-69c-.1-3.8-3.2-7-7.1-7z" className="library-st1"/>
            <path id="XMLID_16_" d="M-125.5 381.7h-47c-1.7 0-3 1.3-3 3v69c0 1.7 1.3 3 3 3h7.3c.1.1.1.2.3.4.6.6 1.5.8 2 .5l3.6-2.8h2.9l3.8 2.9c.5.1 1.2-.1 1.7-.6.1-.1.2-.2.2-.4h25.3c1.7 0 3-1.3 3-3v-69c-.1-1.6-1.4-3-3.1-3zm-28 71h-.5l-1-.8c-.2-.2-.5-.2-.8-.2h-4.5c-.3 0-.6 0-.8.2l-1 .8h-.5v-4h9v4h.1zm27-1c0 .6-.4 1-1 1h-23v-4h9.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-27c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h2.5v4h-5c-.6 0-1-.4-1-1v-9c0-.6.4-1 1-1h43c.6 0 1 .4 1 1v9zm0-15c0 .6-.4 1-1 1h-43c-.6 0-1-.4-1-1v-50c0-.6.4-1 1-1h43c.6 0 1 .4 1 1v50zm-22.3-39c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm4.8 12h-3.5v8.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-8.5h-3.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h10c.8 0 1.5.7 1.5 1.5 0 .9-.7 1.5-1.5 1.5z" className="library-st2"/>
        </svg>;
    }
});

const IconStudy = React.createClass({
    shouldComponentUpdate: function() {
        return false;
    },

    render: function() {
        return <svg className="training icon-ico--148 menu-icon" ref="svg" xmlns="http://www.w3.org/2000/svg" viewBox="-223 346.9 148 148">
            <style>
                {`.training-st0{fill:url(#SVGID_1_);} .training-st1{fill:#0066D9;} .training-st2{fill:#FFFFFF;}`}
            </style>
            <linearGradient id="SVGID_1_" x1="-94.801" x2="-191.551" y1="379.151" y2="474.901" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 -1 0 841.67)">
                <stop offset=".1" stopColor="#020202" stopOpacity="0"/>
                <stop offset="1" stopOpacity=".4"/>
            </linearGradient>
            <path d="M-75 422v72.9h-43.1l-58.3-53 3.4-3.8-26.9-24.4 7-8 13-3.9 11.5-3.9 13.6 11.2 7.2-8.6 16.7 15 2.4-2.4 13-12 13.4 12 8.4-7.8z" className="training-st0"/>
            <path id="XMLID_33_" d="M-98.4 402.9c-4.3-1.7-41.3-12.9-41.5-13 0 0-6.4-2.4-11.9 0l-42.1 13.3s-7.1 1.8-7.3 6.9 6.5 6.3 6.5 6.3l16.6 5.3v15.9s-.1 4 3.5 5.4c4.5 1.7 24.7 8.5 24.7 8.5s2.9 1.4 9.1-.5c6.2-1.9 23.7-7.8 23.7-7.8s2.6-1.2 2.6-5v-16.3l3.1-1.4h.1c-1 1.3-1.7 2.9-1.7 4.6 0 4 3.3 7.3 7.3 7.3s7.3-3.3 7.3-7.3c0-2.4-1.2-4.5-3-5.9v-2l5.8-1.9s4.1-1.8 4.1-5.5-2.5-5.2-6.9-6.9z" className="training-st1"/>
            <path id="XMLID_37_" d="M-120.5 424.1l-21.1 7.8s-4.8 1.1-9.2-.3c-4.4-1.4-21-7.2-21-7.2s-1.9-.6-1.9 1.2v11s-.4 1.7 1.3 2.4c1.6.6 23.1 7.9 23.1 7.9s2.9 1.5 8.7-.6c5.8-2.1 20.6-6.7 20.6-6.7s2.3-.4 2.3-3.2v-11.2s0-2-2.8-1.1zm-1.8 11.4l-21.3 7.1s-3.1.8-5.6 0c-2.4-.8-20.2-6.8-20.2-6.8v-5.6l19.2 6.1s2.3.7 4.1.7 4.7-.9 4.7-.9l19-7v6.4h.1zm23.4-28.3c-1.7-.6-42.2-13.8-42.2-13.8s-6-1-10.3.4l-40.7 12.9s-4.4 1.4-4.4 3.1c.1 1.9 2.7 2.4 4.5 3.1 1.8.6 39.3 12.9 39.3 12.9s6.3 1.8 12.3.1c6.1-1.7 33.4-10.9 33.4-10.9v6.7c-1.5.5-2.5 1.8-2.5 3.4 0 2 1.6 3.6 3.6 3.6s3.6-1.6 3.6-3.6c0-1.6-1.1-2.9-2.5-3.4V414l6.4-1.9s2.2-.8 2.2-2.1c-.1-1.4-1-2.2-2.7-2.8zm-8.8 3.4s-28.5 9.2-33.9 10.7c-5.3 1.5-9 .4-9 .4s-33.9-10.8-35.5-11.2 0-1.1 0-1.1l35.7-11.5c3.7-1.2 7.9-.1 8.1-.1.2 0 33.5 10.8 35.5 11.4 2 .6-.9 1.4-.9 1.4z" className="training-st2"/>
        </svg>;
    }
});

class StartPage extends React.Component {
    componentDidMount() {
        /**
         * Animation
         */
        let menuBlock = this.props.list.map((item, i) => {
            return this.refs['menuBlock'+i];
        });

        let menuBlockIconCircle = this.props.list.map((item, i) => {
            return this.refs['menuBlockIconCircle'+i];
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

            return <div key={i} className="menu-block menu-block__main" ref={'menuBlock'+i}>
                <div className="icon-circle icon-circle--148" ref={'menuBlockIconCircle'+i}>
                    <Icon ref={'menuBlockIcon'+i}/>
                </div>
                <div className="menu-block__title" ref={'menuBlockTitle'+i}>{item.name}</div>
                <div className="menu-block__description" ref={'menuBlockDesc'+i}>{item.caption}</div>
            </div>;
        });

        return <div className="wrapper__main-menu">
            <div className="main-menu__header">
                <h2 className="main-menu__title">Головне меню</h2>
            </div>

            <KeyboardMixin
                list={this.props.list}
                bodyClass="main-menu__body"
                buttons={buttons}
                parent={this}
            />
        </div>;
    }
}

StartPage.defaultProps = {
    list: [
        {
            id: 0,
            url: '/menu/lessons',
            name: 'Уроки',
            icon: IconLessons,
            caption: 'Сценарії уроків'
        },

        {
            id: 1,
            url: '/menu/library',
            name: 'Бібліотека',
            icon: IconLibrary,
            caption: 'Навчально-методичний контент'
        },

        {
            id: 2,
            url: '/menu/study',
            name: 'Інструкції',
            icon: IconStudy,
            caption: 'Інтерактивні інструкції для підготовки до уроків'
        },
    ]
};

export default StartPage;