import React from 'react';

class Enter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pressed: false
        };
    }

    componentDidMount() {
        $(window).on('keydown.enterPressed', (ev) => {
            if (ev.keyCode == 13) {
                this.setState({ pressed: true });
            }
        });

        $(window).on('keyup.enterPressed', () => {
            this.setState({ pressed: false });
        });
    }

    componentWillUnmount() {
        $(window).off('keydown.enterPressed');
        $(window).off('keyup.enterPressed');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.pressed !== nextState.pressed
            || this.props.studyFinished !== nextProps.studyFinished
            || this.props.actionName !== nextProps.actionName
        );
    }

    render() {
        var className = 'control-element';

        if (this.state.pressed) {
            className += ' btn-pressed';
        }

        var actionName = 'Виконати';

        if ( !! this.props.actionName) {
            actionName = this.props.actionName;
        }

        if (this.props.toggleMode) {
            actionName = this.props.toggled ? 'Вимкнути' : 'Увімкнути';
        }

        if ( !! this.props.studyFinished) {
            actionName = 'Переглянути знову';
            className += ' color-inverse';
        }

        return <div className={className}>
            {actionName} <img src="/img/btn-green-enter.png" />
        </div>;
    }
}

export default Enter;