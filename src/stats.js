'use strict';

export default {
    currentEvent: null,

    dispatch: function (event) {
        this.currentEvent = event;

        $.post('/stats/dispatch', { event });
    },

    trackKeys: function(ev) {
        var keyCode = ev.keyCode;
        var section = this.currentEvent;

        $.post('/stats/keyboard/dispatch', { keyCode, section });
    },
}