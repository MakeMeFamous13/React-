'use strict';

import React from 'react';
import store from '../../store';
import keyboard from '../../keyboardEvents';

class TutorialVideo extends React.Component {
    constructor(props) {
        super(props);

        this.keyboardEvents = [];
    }

    componentDidMount() {
        this.keyboardEvents.push(keyboard.keydown({
            back: () => {
                store.dispatch({
                    type: 'POPUP_HIDE'
                });
            }
        }));
    }

    componentWillUnmount() {
        this.keyboardEvents.map((item) => {
            // Unhandle
            item();
        });
    }

    render() {
        return <div className="container-fluid error102">
            <div style={{ top: 0, left: 0 }}>
                <video style={{width:'100%', height:'720px'}} autoPlay={true} controls={true}>
                    <source src="/upload/video.mp4" type="video/mp4"/>
                    <source src="/upload/video.ogv" type="video/ogg"/>
                    Your browser does not support HTML5 video.
                </video>
            </div>
        </div>;
    }
}

export default TutorialVideo;