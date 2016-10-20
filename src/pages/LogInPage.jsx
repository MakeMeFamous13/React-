'use strict';

import React from 'react';
import { hashHistory as routerHistory } from 'react-router';
import { connect } from 'react-redux';
import Stats from '../stats';

class LogInPage extends React.Component {
    componentDidMount() {
        /**
         * Animation
         */
        var entryNotice = this.refs.entryNotice;
        var entryCircle = this.refs.entryCircle;
        //var entryIcon = this.refs.entryIcon;
        var entryUser = this.refs.userBlockTitle;
        var entryUserDesc = this.refs.userBlockDescription;

        var tlEntry = new TimelineLite()
        .from(entryNotice, 3, {opacity:0, delay:0.5}, "entryNotice")
        .from(entryCircle, 1, {opacity:0, scale:1.2, ease:Linear.easeNone}, "entryNotice+=1.2")
        .from(entryUser, 1, {opacity:0, scale:0.7, ease:Linear.easeNone}, "entryNotice+=1.7")
        .from(entryUserDesc, 1, {opacity:0, scale:0.7, ease:Linear.easeNone}, "entryNotice+=2.2");

        Stats.dispatch('Вход в систему');

        setTimeout(() => {
            // Fade out animation
            var tlEntry = new TimelineLite();
            tlEntry.to([entryNotice, entryCircle, entryUser, entryUserDesc], 1, {opacity:0})
            .eventCallback('onComplete', () => {
                // Go to menu when animation complete
                routerHistory.push('/menu');
            });
        }, 5000);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div className="wrapper">
            <div className="logo-tbox">
                <img src="img/logo.png" alt="T-Box logo"/>
            </div>

            <div ref="entryNotice" className="entry-txt">Вхід у систему</div>

            <div className="wrapper__user-block">
                <div className="user-block">
                    <div ref="entryCircle">
                        <img src="/img/icon/icon_physics.gif" />
                    </div>

                    <div className="user-block__details">
                        <div className="user-block__title" ref="userBlockTitle">
                            {this.props.user.name}
                        </div>
                        <div className="user-block__description" ref="userBlockDescription">
                            {this.props.user.school}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.system.user
    };
};

export default connect(mapStateToProps)(LogInPage);