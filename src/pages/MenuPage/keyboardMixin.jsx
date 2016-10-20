'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory as routerHistory } from 'react-router';

import _ from 'underscore';
import store from '../../store';

import OwlCarousel from 'react-owl-carousel';

export default class KeyboardMixin extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            setup: false,
            current: 0,
            working: true
        };
        
        this.subscriber = null;
        this.currentPage = 0;
        this.itemsPerPage = 4;
        this.maxPages = 0;
    }

    componentDidMount() {
        /**
         * Subscribe to state change, see if keyboard should be enabled/disabled
         */
        this.subscriber = store.subscribe(() => {
            let state = store.getState();
            
            // See contextmenu and popup
            let working = !state.menu.contextMenu && !state.section.popup;

            if (working !== this.state.working) {
                this.setState({ working });
            }
        });

        this.$list = $(ReactDOM.findDOMNode(this.refs.list));

        /**
         * First setup
         */
        if ( ! this.state.setup) {
            /*this.setState({
                dispatchAction: this.props.dispatchAction,
                setup: true
            });*/
        }

        /**
         * Listen to keyboard
         */
        $(document).on('keydown.keyboardMixin', (ev) => {
            if ( ! this.state.working) {
                return;
            }

            this.handleEvent(ev);
        });

        this.init();
        this.startWaiting();
    }

    componentWillUnmount() {
        // Unsubscribe it
        $(document).off('keydown.keyboardMixin');
        this.subscriber();

        // Stop listening
        this.fullStopWaiting();
    }

    componentDidUpdate() {
        this.init();
    }

    init() {
        // Recalculate each time changed
        this.maxPages = Math.ceil(this.props.list.length / this.itemsPerPage);

        setTimeout(() => {
            var $item;

            if (this.$list.is('.owl-carousel')) {
                $item = this.$list.find('.owl-item:first');
            }
            else {
                $item = this.$list.find(this.itemClass() +':first');
            }

            this.$item = $item;

            // First time mark active item
            this.markActive();
        }, 100);
    }

    shouldComponentUpdate(nextProps) {
        // Update only on list change
        return this.props.list.length != nextProps.list.length;
    }

    menuBlock() {
        if ( ! this.props.parent) {
            return;
        }

        return _.map(this.props.list, (item, i) => {
            return this.props.parent.refs['menuBlock'+i];
        }, this);
    }

    startWaiting() {
        // Autostart in 5 secs
        this.waitingTimer = setTimeout(() => {
            let menuBlock = this.menuBlock();

            this.waitingAnimation = [
                TweenMax.staggerTo(menuBlock, 0.5, {scale: 1.05}, 1),
                TweenMax.staggerTo(menuBlock, 0.5, {scale: 1, delay: 0.5}, 1)
            ];

            // Restart animation
            this.startWaiting();
        }, 5000);
    }

    fullStopWaiting() {
        if (typeof this.waitingAnimation !== 'undefined') {
            this.waitingAnimation.map((item) => {
                if ( ! item) {
                    return;
                }

                item.map((child) => {
                    // End animation
                    child.progress(1);
                });
            });
        }

        if (typeof this.waitingTimer !== 'undefined') {
            clearTimeout(this.waitingTimer);
        }
    }

    stopWaiting() {
        this.fullStopWaiting();

        // Restart on inactivity
        this.startWaiting();
    }

    activeClass(itemIndex) {
        let activeClassProp = this.props.activeClass;

        if (typeof activeClassProp === 'function') {
            let currentItem = this.props.list[((typeof itemIndex !== 'undefined')
                ? ~~ itemIndex
                : ~~ this.state.current)
            ];

            activeClassProp = activeClassProp(currentItem);
        }

        return activeClassProp || 'menu-block--active';
    }

    itemClass() {
        return this.props.itemClass ? '.'+ this.props.itemClass : '.menu-block';
    }

    demarkActive() {
        let activeClass = this.activeClass();
        let $item = this.$list.find(this.itemClass());

        $item.removeClass(activeClass);
    }

    markActive(itemIndex) {
        //let $menuBlock = this.$item.is(this.itemClass()) ? this.$item : this.$item.find(this.itemClass());
        let $menuBlock = this.$item;
        let activeClass = this.activeClass(itemIndex);

        $menuBlock.addClass(activeClass);
    }

    handleEvent(ev) {
        var keys;

        if (this.props.mode === 'VERTICAL') {
            keys = {
                // Top
                38: this.eventGoLeft,

                // Bottom
                40: this.eventGoRight,

                // Enter
                13: this.eventEnter
            };
        }
        else {
            keys = {
                // Left
                37: this.eventGoLeft,

                // Right
                39: this.eventGoRight,

                // Enter
                13: this.eventEnter
            };
        }

        // Determine handler
        var handler = keys[ev.keyCode];

        if (typeof handler === 'undefined') {
            // Don't interrupt other keys
            return;
        }

        if (typeof this.props.onChange === 'function') {
            this.props.onChange();
        }

        // Every action stops waiting mode
        this.stopWaiting();

        // Prevent from default behaviour
        ev.preventDefault();

        // Run handler
        handler.bind(this)();
    }

    eventGoLeft () {
        if (this.$item.length <= 0) {
            return;
        }

        let nextValue = this.state.current-1;

        if (nextValue < 0) {
            return;
        }

        let $prev = this.$item.prev();

        if ($prev.length <= 0) {
            return;
        }

        this.demarkActive();

        // Mark new item
        this.$item = $prev;
        this.markActive(nextValue);

        if ( !! this.refs.list) {
            if (this.state.current > 0 && (this.state.current % 4 === 0)) {
                setTimeout(() => {
                    this.currentPage--;

                    if (this.currentPage < 0) {
                        this.currentPage = 0;
                    }
                    else {
                        this.refs.list.goTo(this.currentPage * this.itemsPerPage);
                    }
                }, 1);
            }
        }

        this.setState({
            current: nextValue
        });
    }

    eventGoRight () {
        if (this.$item.length <= 0) {
            return;
        }

        let nextValue = this.state.current+1;

        if (nextValue > this.props.list.length) {
            return;
        }

        let $next = this.$item.next();

        if ($next.length <= 0) {
            return;
        }

        this.demarkActive();

        // Mark new item
        this.$item = $next;
        this.markActive(nextValue);

        if ( !! this.refs.list) {
            if (this.state.current > 0 && ((this.state.current-1) % 2 === 0 && (this.state.current-1) % 4 !== 0)) {
                setTimeout(() => {
                    this.currentPage++;

                    if (this.currentPage > this.maxPages) {
                        this.currentPage = this.maxPages;
                    }
                    else {
                        this.refs.list.goTo(this.currentPage * this.itemsPerPage);
                    }
                }, 1);
            }
        }

        this.setState({
            current: nextValue
        });
    }

    eventEnter () {
        if (typeof this.props.dispatchAction === 'function') {
            this.props.dispatchAction(this.props.list[this.state.current], this.state.current);
            return;
        }

        // Go to url
        routerHistory.push(this.props.list[this.state.current].url);
    }

    render() {
        let sliderItems = this.props.sliderItems || 4;
        let { buttons } = this.props;
        let style = {};

        if (buttons.length <= sliderItems) {
            if (this.props.mode === 'VERTICAL') {
                style = { marginTop: '55px'};
            }

            return <div className={this.props.bodyClass} style={style} ref="list">
                {buttons}
            </div>
        }
        else {
            return <OwlCarousel
                items={sliderItems}
                rewindNav={false}
                scrollPerPage={true}
                className={this.props.bodyClass}
                ref="list">
                {this.props.buttons}
            </OwlCarousel>;
        }
    }
}