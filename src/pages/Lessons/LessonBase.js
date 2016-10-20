'use strict';

import Promise from 'bluebird';
import _ from 'underscore';

export default class LessonBase {

    constructor(pages) {
        this.pages = pages;
    }

    load() {
        // For lesson content
        window.completeLib = {};
        window.images = {};
        window.ss = {};

        // Preload all animation files
        return Promise.each(this.pages, (item) => {
            if (typeof item.pages !== 'undefined' && !! item.pages) {
                // Container
                return Promise.each(item.pages, (subItem) => {
                    return this._onePage(subItem);
                })
            }
            else {
                return this._onePage(item);
            }
        });
    }

    _onePage(item) {
        return new Promise((pageResolve) => {
            if (typeof item.resources === 'undefined' || ! item.resources) {
                // No resources
                pageResolve(true);
                return;
            }

            // Go by each resource
            Promise.each(item.resources, (resource) => {
                return new Promise((resourceResolve) => {
                    // Reset var
                    delete window.lib;
                    window.lib = {};

                    $.getScript(resource.animationFile, () => {
                        // Insert new lib data
                        window.completeLib = _.extend(window.completeLib, {
                            [resource.animationFile]: _.clone(window.lib)
                        });

                        // Reset var
                        delete window.lib;
                        window.lib = {};

                        resourceResolve(true);
                    });
                });
            }).then(() => {
                pageResolve(true);
            });
        });
    }

    /**
     * Incapsulate pages property
     * @returns {*}
     */
    getPages() {
        return this.pages;
    }

}
