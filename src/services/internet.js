'use strict';

import store from '../store';

export default {
    // Indication that checking has been started
    checking: false,

    check: function() {
        if (this.checking) {
            // Wait, until previous request is done
            return;
        }

        // Indicate that we are requesting now
        this.checking = true;

        $.get('/init/has-internet', (response) => {
            this.checking = false;

            if ( ! response) {
                return;
            }

            let state = store.getState();

            if (response.status === state.system.internet) {
                // This is current state, no need to proceed futher
                return;
            }

            store.dispatch({
                type: (response.status === false)
                    ? 'SYSTEM_NO_INTERNET'
                    : 'SYSTEM_YES_INTERNET'
            });
        }, 'json')
        .fail(() => {
            this.checking = false;
        });
    },

    checkOrNotify: function() {
        let state = store.getState();

        if ( ! state.system.internet) {
            store.dispatch({
                type: 'POPUP_INTERNET',
            });
        }
    }
};