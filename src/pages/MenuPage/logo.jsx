'use strict';
import React from 'react';

class Logo extends React.Component {
    componentDidMount() {
        this.animate();
    }

    componentDidUpdate() {
        this.animate();
    }

    animate() {
        $.Velocity(this.refs.logo, 'fadeIn', { duration: 1500, delay: 0 }, { display: "block" });
    }

    shouldComponentUpdate(nextProps) {
        return (this.props.popup !== nextProps.popup
            || this.props.contextMenu !== nextProps.contextMenu
        );
    }

    render() {
        let visible = (
            (['InstructionRemote', 'StudySystem', 'TutorialVideo']).indexOf(this.props.popup) == -1
            && this.props.contextMenu === null
        );

        if ( ! visible) {
            return <span/>;
        }

        return <img src="/img/logo.png" style={{ opacity: 0 }} ref="logo"/>;
    }
}

export default Logo;