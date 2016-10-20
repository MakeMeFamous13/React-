import React from 'react';

class Back extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pressed: false
        };
    }

    componentDidMount() {
        $(window).on('keydown.backPressed', (ev) => {
            if (ev.keyCode == 8 || ev.keyCode == 27) {
                this.setState({
                    pressed: true
                });
            }
        });

        $(window).on('keyup.backPressed', (ev) => {
            if ( ! this.state.pressed) {
                return;
            }

            this.setState({
                pressed: false
            });
        })
    }

    componentWillUnmount() {
        $(window).off('keydown.backPressed');
        $(window).off('keyup.backPressed');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.pressed !== nextState.pressed
            || this.props.inversed !== nextProps.inversed
        );
    }

    render() {
        var className = 'control-element';

        if (this.props.inversed) {
            className += ' color-inverse';
        }

        if (this.state.pressed) {
            className += ' btn-pressed';
        }

        return <div className={className}>
            Повернутися <img src="/img/btn-green-return.png" />
        </div>
    }
}

export default Back;