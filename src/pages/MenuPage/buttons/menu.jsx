'use strict';

import React from 'react';
import keyboard from '../../../keyboardEvents';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pressed: false
        };
    }

    componentDidMount() {
        this.contextMenuEvents = keyboard.contextmenu(() => {
            this.setState({ pressed: true });

            setTimeout(() => {
                this.setState({ pressed: false });
            }, 50);
        });
    }

    componentWillUnmount() {
        if (this.contextMenuEvents) {
            this.contextMenuEvents();
        }
    }

    render() {
        var className = 'control-element';

        if (this.state.pressed) {
            className += ' btn-pressed';
        }

        return <div className={className}>
            Меню <img src="/img/btn-green-menu.png" />
        </div>;
    }
}

export default Menu;