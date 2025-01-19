/**
 * @file moreButtonModule.js
 * @description This module handles the functionality of a "More" button that shows or hides additional list items.
 * @module MoreButtonModule
 */

import { DOM } from "../utils/dom.js";

/**
 * Class representing the MoreButtonModule.
 * @extends DOM
 */
export class MoreButtonModule extends DOM {
    /**
     * The button element that triggers the show/hide functionality.
     * @type {HTMLElement}
     */
    button;

    /**
     * Configuration object for the module.
     * @type {Object}
     */
    config;

    /**
     * Indicates whether the additional items are currently visible.
     * @type {boolean}
     */
    isVisible;

    /**
     * The initial number of visible items.
     * @type {number}
     */
    initialVisible;

    /**
     * Creates an instance of MoreButtonModule.
     * @param {string|HTMLElement} target - The target button element or its selector.
     * @param {Object} config - Configuration object for the module.
     * @param {string} config.listWrapper - Selector for the list wrapper element.
     * @param {string} config.listItems - Selector for the list items.
     * @param {string} config.hideClass - Class name used to hide items.
     * @param {string|number} config.itemsToShow - Number of items to show or 'all' to show all items.
     */
    constructor(target, config) {
        super();

        this.button = this.getTarget(target);
        this.config = config;
        this.isVisible = false;
        this.initialVisible = [...this.getAllTargets(`${config.listWrapper} ${config.listItems}:not(.${config.hideClass})`)].length;

        this.button.addEventListener('click', () => {
            if (this.isVisible) this.hide();
            else this.show();
        })
    }

    /**
     * Shows the hidden items based on the configuration.
     */
    show() {
        const hiddenItems = [...this.getAllTargets(`${this.config.listWrapper} .${this.config.hideClass}`)];

        if (this.config.itemsToShow === 'all') {
            hiddenItems.forEach((element, index) => {
                element.classList.remove(this.config.hideClass);
            });
            this.button.innerHTML = this.button.getAttribute('data-hide');
            this.isVisible = true;
            this.button.dispatchEvent(new CustomEvent('showItems'));
            return;
        }

        console.warn('Params no support');
    }

    /**
     * Hides the items that exceed the initial visible count.
     */
    hide() {
        const allItems = [...this.getAllTargets(`${this.config.listWrapper} ${this.config.listItems}`)];
        allItems.forEach((element, index) => {
            if (index + 1 > this.initialVisible) {
                element.classList.add(this.config.hideClass);
                this.isVisible = false;
                this.button.innerHTML = this.button.getAttribute('data-show');
            }
        })
        this.button.dispatchEvent(new CustomEvent('hideItems'));
    }
}