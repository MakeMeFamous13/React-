'use strict';

function handler (eventHandler, event) {
    let token = new Date().getTime();
    let eventName = event +'.'+ token;

    // Subscribe
    $(window).on(eventName, function(ev) {
        ev.preventDefault();

        if ( ! eventHandler) {
            return;
        }

        if (typeof eventHandler === 'function') {
            eventHandler(ev);
        }
        else if (typeof eventHandler === 'object') {
            if ( !! eventHandler.back && (ev.keyCode == 8 || ev.keyCode == 27)) {
                // Backspace action
                eventHandler.back();
            }
            else if ( !! eventHandler.home && (ev.keyCode == 36)) {
                // Home action
                eventHandler.back();
            }
            else if ( !! eventHandler.enter && (ev.keyCode == 13)) {
                // Enter action
                eventHandler.enter();
            }
            else if ( !! eventHandler.left && (ev.keyCode == 37)) {
                // Left action
                eventHandler.left();
            }
            else if ( !! eventHandler.right && (ev.keyCode == 39)) {
                // Right action
                eventHandler.right();
            }
            else if ( !! eventHandler.menu && (ev.keyCode == 93)) {
                // Context menu
                eventHandler.menu();
            }
        }
    });

    return () => {
        // Unsubscribe
        $(window).off(eventName);
    }
}

export default {
    keydown: (eventHandler) => {
        return handler(eventHandler, 'keydown');
    },

    contextmenu: (eventHandler) => {
        // Disable contextmenu browser handler
        handler(null, 'contextmenu');

        return handler({
            menu: eventHandler
        }, 'keydown');
    },
}