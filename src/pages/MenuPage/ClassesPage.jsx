'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import store from '../../store';
import { connect } from 'react-redux';
import _ from 'underscore';
import KeyboardMixin from './keyboardMixin.jsx';
import Stats from '../../stats';

class ClassesPage extends React.Component {
    componentDidMount () {
        Stats.dispatch(this.isLibrary()
            ? 'Библиотека: Предмет выбран - '+ this.props.selectedSubject.name
            : 'Предмет выбран - '+ this.props.selectedSubject.name
        );

        if (_.isEmpty(this.props.classes)) {
            $.get('/api/subjects/classes?subject=' + this.props.subjectId, (response) => {
                store.dispatch({
                    type: 'CLASSES_LOAD',
                    subjectId: this.props.subjectId,
                    list: response
                });

                if (this.autoSkip()) {
                    return;
                }

                this.animate();
            }, 'json');
        }
        else {
            if (this.autoSkip()) {
                return;
            }

            this.animate();
        }
    }

    autoSkip() {
        if (_.size(this.props.classes) == 1) {
            // Autoskip
            let section = this.isLibrary()
                ? '/menu/library'
                : '/menu/lessons';

            routerHistory.push(section +'/subject-'+ this.props.subjectId +'/class-'+ this.props.classes[0].id +'?skipped=class');
            return true;
        }
    }

    isLibrary() {
        return this.props.location.pathname.indexOf('menu/library') !== -1;
    }

    animate() {
        let menuBlock = this.props.classes.map((item, i) => {
            return this.refs['menuBlock'+i];
        });

        let menuBlockTitle = this.props.classes.map((item, i) => {
            return this.refs['menuBlockTitle'+i];
        });

        let menuBlockDesc = this.props.classes.map((item, i) => {
            return this.refs['menuBlockDesc'+i];
        });

        var tlMainMenu = new TimelineLite();
        tlMainMenu.staggerFrom(menuBlock, 0.7, {opacity:0, scale:0.65, ease:Linear.easeNone}, 0.4, "menublock")
        .staggerFrom(menuBlockTitle, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "menublock+=0.3")
        .staggerFrom(menuBlockDesc, 0.7, {opacity:0, ease:Linear.easeNone}, 0.4, "menublock+=0.3");
    }

    render() {
        const buttons = this.props.classes.map((item, i) => {
            const className = 'menu-block menu-block__classes';

            return <div key={i} className={className} ref={'menuBlock'+i}>
                <div className="menu-block__title" ref={'menuBlockTitle'+i}>{item.class}</div>
                <div className="menu-block__description" ref={'menuBlockDesc'+i}>Клас</div>
            </div>;
        });

        let activeClass = 'menu-block--active-'+ this.props.selectedSubject.icon;
        let className = 'wrapper__main-menu visible';
        
        return <div className={className}>
            <div className="main-menu__header">
                <h2 className="main-menu__title">Класи з {this.props.selectedSubject.name_genetive}</h2>
            </div>

            <KeyboardMixin
                dispatchAction={(current) => {
                    let section = this.isLibrary()
                        ? '/menu/library'
                        : '/menu/lessons';

                    routerHistory.push(section +'/subject-'+ this.props.subjectId +'/class-'+ current.id);
                }}
                list={this.props.classes}
                activeClass={activeClass}
                bodyClass="main-menu__body"
                sliderItems={6}
                buttons={buttons}
                parent={this}
            />
        </div>;
    }
}

const mapStateToProps = (store, props) => {
    const subjectId = ~~ props.params.subjectId;
    const selectedSubject = _.findWhere(store.subjects.list, { id: subjectId }) || {};
    const classes = store.classes[subjectId] || [];

    return {
        classes,
        subjectId,
        selectedSubject
    };
};

export default connect(mapStateToProps)(ClassesPage);