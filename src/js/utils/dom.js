
/**
 * A utility class for DOM manipulation.
 */
export class DOM {
    /**
     * Retrieves a single DOM element based on the provided target.
     * If the target is a string, it will be used as a selector to find the element.
     * If the target is already a DOM element, it will be returned as is.
     *
     * @param {string | Element} target - The target selector or DOM element.
     * @returns {Element | null} The found DOM element or null if not found.
     */
    getTarget(target) {
        return typeof target === 'string'
            ? document.querySelector(target)
            : target;
    }

    /**
     * Retrieves all DOM elements that match the provided target.
     * If the target is a string, it will be used as a selector to find the elements.
     * If the target is already a NodeList or an array of elements, it will be returned as is.
     *
     * @param {string | NodeList | Array<Element>} target - The target selector or collection of DOM elements.
     * @returns {NodeList | Array<Element>} The found DOM elements.
     */
    getAllTargets(target) {
        return typeof target === 'string'
            ? document.querySelectorAll(target)
            : target;
    }
}