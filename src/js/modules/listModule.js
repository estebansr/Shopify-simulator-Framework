/**
 * @file listModule.js
 * @description This module handles the functionality of showing and hiding list items in a DOM element.
 * @module ListModule
 */

import { DOM } from "../utils/dom.js";

/**
 * Class representing a ListModule.
 * @extends DOM
 */
export class ListModule extends DOM {
    /**
     * The list element.
     * @type {HTMLElement}
     */
    list;

    /**
     * Configuration object.
     * @type {Object}
     */
    config;

    /**
     * Flag indicating whether all items are shown.
     * @type {boolean}
     */
    shownAll;

    /**
     * Array of items to be hidden.
     * @type {HTMLElement[]}
     */
    hideItems;

    /**
     * The "more" button element.
     * @type {HTMLElement}
     */
    moreButton;

    /**
     * Create a ListModule.
     * @param {string|HTMLElement} target - The target element or selector.
     * @param {Object} config - The configuration object.
     * @param {string} config.hideClass - The class name used to hide items.
     * @param {string|HTMLElement} config.moreButton - The "more" button element or selector.
     */
    constructor(target, config) {
        super();

        this.list = this.getTarget(target);
        this.config = config;
        this.shownAll = false;

        this.hideItems = [...this.list.children].
            filter(item => item.classList.contains(config.hideClass));

        this.moreButton = this.getTarget(config.moreButton);
        this.moreButton?.addEventListener('click', () => {
            if (this.isVisible) this.hide();
            else this.show();
        });
    }

    /**
     * Show the hidden items.
     */
    show() {
        this.hideItems.forEach((element, index) => {
            element.classList.remove(this.config.hideClass);
        });
        this.isVisible = true;
        this.moreButton.innerHTML = this.moreButton.getAttribute('data-hide');
        this.moreButton.dispatchEvent(new CustomEvent('showItems'));
    }

    /**
     * Hide the items.
     */
    hide() {
        this.hideItems.forEach((element, index) => {
            element.classList.add(this.config.hideClass);
        });
        this.isVisible = false;
        this.moreButton.innerHTML = this.moreButton.getAttribute('data-show');
        this.moreButton.dispatchEvent(new CustomEvent('hideItems'));
    }
}