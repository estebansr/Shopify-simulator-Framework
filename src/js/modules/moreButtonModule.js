import { DOM } from "../utils/dom.js";

export class MoreButtonModule extends DOM {
    button;
    config;
    isVisible;
    initialVisible;

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