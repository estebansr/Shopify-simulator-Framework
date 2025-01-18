import { DOM } from "../utils/dom.js";

export class HeaderCollapse extends DOM {
    menu;
    config;
    isCollapsed;

    constructor(target, config) {
        super();

        this.menu = this.getTarget(target);

        this.config = { activeClass: 'active', ...config };
        this.isCollapsed = false;

        if (!config.toggler) return;
        const togglerTarget = this.getTarget(config.toggler);

        togglerTarget.addEventListener('click', () => {
            if (this.isCollapsed) this.close();
            else this.open();
        })
    }

    open() {
        if (!this.menu) return;
        this.isCollapsed = true;
        this.menu.classList.add(this.config.activeClass);
    }

    close() {
        if (!this.menu) return;
        this.isCollapsed = false;
        this.menu.classList.remove(this.config.activeClass);
    }
}