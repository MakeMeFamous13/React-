'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import store from '../../store';
import { connect } from 'react-redux';
import _ from 'underscore';
import Stats from '../../stats';

import KeyboardMixin from './keyboardMixin.jsx';
import Icons from './SubjectsIcons.jsx';

class SubjectsPage extends React.Component {
    componentDidMount() {
        if (_.isEmpty(this.props.subjectsList)) {
            /**
             * Load subjects for first time
             */
            $.get('/api/subjects', (response) => {
                store.dispatch({
                    type: 'SUBJECTS_LOAD',
                    list: response
                });

                this.animate();
            }, 'json');
        }
        else {
            this.animate();
        }

        Stats.dispatch(this.isLibrary()
            ? 'Отображение предметов библиотеки'
            : 'Отображение предметов'
        );
    }

    isLibrary() {
        return this.props.location.pathname.indexOf('menu/library') !== -1;
    }

    animate() {
        let menuBlock = this.props.subjectsList.map((item, i) => {
            return this.refs['menuBlock'+i];
        });

        let menuBlockIconCircle = this.props.subjectsList.map((item, i) => {
            return this.refs['menuBlockIcon'+i].refs.menuBlockIconCircle;
        });

        let menuBlockIcon = this.props.subjectsList.map((item, i) => {
            return this.refs['menuBlockIcon'+i].refs.svg;
        });

        let menuBlockTitle = this.props.subjectsList.map((item, i) => {
            return this.refs['menuBlockTitle'+i];
        });

        let menuBlockDesc = this.props.subjectsList.map((item, i) => {
            return this.refs['menuBlockDesc'+i];
        });

        var tlMainMenu = new TimelineLite();
        tlMainMenu.staggerFrom(menuBlock, 0.7, {opacity:0, scale:0.65, ease:Linear.easeNone}, 0.4, "menublock")
        .staggerFrom(menuBlockIconCircle, 0.7, {opacity:0, scale:1.2, ease:Linear.easeNone}, 0.4, "menublock+=0.3")
        .staggerFrom(menuBlockIcon, 0.7, {opacity:0.5, scale:0.5, ease:Linear.easeNone}, 0.4, "menublock+=0.3")
        .staggerFrom(menuBlockTitle, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "menublock+=0.3")
        .staggerFrom(menuBlockDesc, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "menublock+=0.3");
    }

    render() {
        const buttons = this.props.subjectsList.map((item, i) => {
            const iconName = item.icon;
            const Icon = Icons[iconName];
            const className = 'menu-block menu-block__subject menu-block-'+ iconName;

            let descriptionText;

            if ( !! item.description) {
                descriptionText = item.description;
            }
            else {
                if (item.minClass > 0 && (item.maxClass > 0 && item.maxClass != item.minClass)) {
                    // Range of classes
                    descriptionText = item.minClass +' - '+ item.maxClass +' класи';
                }
                else {
                    // Single class
                    descriptionText = (item.minClass || item.maxClass) +' клас';
                }
            }

            return <div key={i} className={className} ref={'menuBlock'+i}>
                <Icon ref={'menuBlockIcon'+i}/>
                <div className="menu-block__title" ref={'menuBlockTitle'+i}>{ item.name }</div>
                <div className="menu-block__description" ref={'menuBlockDesc'+i}>{ descriptionText }</div>
            </div>;
        });

        let activeClass = function(item) {
            if (typeof item !== 'undefined' && !! item.icon) {
                return 'menu-block--active-'+ item.icon;
            }
        };

        return <div className="wrapper__main-menu">
            <div className="main-menu__header">
                <h2 className="main-menu__title">Предмет</h2>
            </div>

            <KeyboardMixin
                dispatchAction={(current) => {
                    let section = this.isLibrary()
                        ? '/menu/library'
                        : '/menu/lessons';

                    routerHistory.push(section +'/subject-'+ current.id);
                }}
                list={this.props.subjectsList}
                activeClass={activeClass}
                bodyClass="main-menu__body"
                buttons={buttons}
                parent={this}
            />
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        subjectsList: store.subjects.list
    };
};

export default connect(mapStateToProps)(SubjectsPage);