/**
 * @file headerModule.js
 * @description This module handles the header functionality including animations, toggling, and collapsing.
 * @module HeaderModule
 */

import { DOM } from "../utils/dom.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

/**
 * Class representing the HeaderModule.
 * @extends DOM
 */
export class HeaderModule extends DOM {
    /**
     * The header element.
     * @type {HTMLElement}
     */
    header;

    /**
     * Configuration object for the header module.
     * @type {Object}
     */
    config;

    /**
     * Indicates whether the header is collapsed.
     * @type {boolean}
     */
    isCollapsed;

    /**
     * Create a HeaderModule.
     * @param {string|HTMLElement} target - The target element or selector for the header.
     * @param {Object} config - The configuration object.
     * @param {string} [config.activeClass='active'] - The class to add when the header is active.
     * @param {string} [config.toggler] - The selector for the toggler element.
     * @param {string} [config.itemClass] - The class for items that close the header when clicked.
     * @param {Object} [config.on] - The event handlers.
     * @param {Function} [config.on.open] - The function to call when the header is opened.
     * @param {Function} [config.on.close] - The function to call when the header is closed.
     */
    constructor(target, config) {
        super();

        this.header = this.getTarget(target);
        this.config = { activeClass: 'active', ...config };
        this.isCollapsed = false;

        this.animate();

        if (!config.toggler) return;
        const togglerTarget = this.getTarget(config.toggler);

        togglerTarget.addEventListener('click', () => {
            if (this.isCollapsed) this.close();
            else this.open();
        })

        this.header.addEventListener('click', (e) => {
            const isItem = e.target.classList.contains(config.itemClass);
            if (isItem) this.close();
        });
    }

    /**
     * Initialize the header animation using GSAP and ScrollTrigger.
     */
    animate() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to('.header__fixed', {
            backdropFilter: "blur(10px)",
            backgroundColor: '#73737373',
            scrollTrigger: {
                start: '25px top',
                trigger: 'body',
                end: 'bottom top',
                endTrigger: this.header,
                scrub: true
            }
        })
    }

    /**
     * Open the header.
     */
    open() {
        if (!this.header) return;
        this.isCollapsed = true;
        this.header.classList.add(this.config.activeClass);
        document.body.style.overflow = 'hidden';
        this.config.on?.open?.();
    }

    /**
     * Close the header.
     * @returns {Promise<void>} A promise that resolves when the header is closed.
     */
    async close() {
        if (!this.header) return;
        this.isCollapsed = false;
        await this.config.on?.close?.();
        this.header.classList.remove(this.config.activeClass);
        document.body.style.removeProperty('overflow');
    }
}