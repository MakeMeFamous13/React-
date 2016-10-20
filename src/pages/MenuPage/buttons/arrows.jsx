import React from 'react';

class Arrows extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftPressed: false,
            rightPressed: false
        };
    }

    componentDidMount() {
        $(window).on('keydown.arrowsPressing', (ev) => {
            var leftPressed = (ev.keyCode === (this.vertical ? 38 : 37));
            var rightPressed = (ev.keyCode === (this.vertical ? 40 : 39));

            this.setState({ leftPressed, rightPressed });
        });

        $(window).on('keyup.arrowsPressing', (ev) => {
            this.setState({
                leftPressed: false,
                rightPressed: false
            });
        });
    }

    componentWillUnmount() {
        $(window).off('keydown.arrowsPressing');
        $(window).off('keyup.arrowsPressing');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.leftPressed !== nextState.leftPressed
            || this.state.rightPressed !== nextState.rightPressed
        );
    }
}

class ArrowsHorizontal extends Arrows {
    componentDidMount() {
        super.componentDidMount();
        $.Velocity(this.refs.item, 'fadeIn', { duration: 1500, delay: 0, display: "inline-flex" });
    }

    render() {
        var leftClass = 'control-element';

        if (this.state.leftPressed) {
            leftClass += ' btn-pressed';
        }

        var rightClass = 'control-element';

        if (this.state.rightPressed) {
            rightClass += ' btn-pressed';
        }

        return <div className="navmain navmain--bottom" style={{opacity: 0}} ref="item">
            <div className="arrow">
                <div className={leftClass}>
                    <img src="img/prev-el.png" alt="Previouse"/>
                </div>
                &nbsp;
                <div className={rightClass}>
                    <img src="img/next-el.png" alt="Next"/>
                </div>
            </div>
        </div>;
    }
}

class ArrowsVertical extends Arrows {
    constructor(props) {
        super(props);

        this.vertical = true;
    }

    componentDidMount() {
        super.componentDidMount();
        $.Velocity(this.refs.item, 'fadeIn', { duration: 1500, delay: 0, display: "inline-flex" });
    }

    render() {
        var leftClass = 'control-element';

        if (this.state.leftPressed) {
            leftClass += ' btn-pressed';
        }

        var rightClass = 'control-element';

        if (this.state.rightPressed) {
            rightClass += ' btn-pressed';
        }

        return <div className="navmain navmain--right" style={{opacity: 0}} ref="item">
            <div className="arrow">
                <div className={leftClass}>
                    <img src="img/arrow-up.png" alt="Up"/>
                </div>
                <div className={rightClass}>
                    <img src="img/arrow-down.png" alt="Down"/>
                </div>
            </div>
        </div>;
    }
}

export { ArrowsHorizontal, ArrowsVertical };