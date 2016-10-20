'use strict';

import React from 'react';
import store from '../../store';
import keyboard from '../../keyboardEvents';

class StudySystem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };

        this.maxItems = 18;
        this.keyboardEvents = [];
    }

    componentDidMount() {
        store.dispatch({
            type: 'STUDY_FINISHED',
            value: false
        });

        this.keyboardEvents.push(keyboard.keydown({
            back: () => {
                store.dispatch({
                    type: 'POPUP_HIDE'
                });
            },

            enter: () => {
                if (this.isFinished()) {
                    this.setState({ selected: 0 });
                }
            }
        }));

        this.keyboardEvents.push(keyboard.keydown((ev) => {
            if ([37, 39].indexOf(ev.keyCode) != -1) {
                ev.preventDefault();

                let { selected } = this.state;

                if (ev.keyCode === 37) {
                    selected--;
                }
                else if (ev.keyCode === 39) {
                    selected++;
                }

                if (selected <= 0) {
                    selected = 0;
                }

                if (selected > this.maxItems) {
                    selected = this.maxItems;
                }

                this.setState({selected});
            }
        }));
    }

    componentDidUpdate() {
        store.dispatch({
            type: 'STUDY_FINISHED',
            value: this.isFinished()
        });
    }

    componentWillUnmount() {
        this.keyboardEvents.map((item) => {
            // Unhandle
            item();
        });
    }

    isFinished() {
        return this.state.selected >= this.maxItems;
    }

    render() {
        let image = '/upload/study/Инструкция_'+ this.state.selected +'.jpg';

        return <div id="main" className="container-fluid error102">
            <div className="error102-inner" ref="error103Inner" style={{ top: 0, left: 0 }}>
                <div id="t-box-edu">
                    <img src={image}/>
                </div>
            </div>
        </div>;
    }
}

export default StudySystem;