import { DOM } from "../utils/dom.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

export class HeaderModule extends DOM {
    header;
    config;
    isCollapsed;

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
    }

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

    open() {
        if (!this.header) return;
        this.isCollapsed = true;
        this.header.classList.add(this.config.activeClass);
    }

    close() {
        if (!this.header) return;
        this.isCollapsed = false;
        this.header.classList.remove(this.config.activeClass);
    }
}