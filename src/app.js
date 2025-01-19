import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

import { DOM } from "./js/utils/dom.js";
import { HeaderModule } from './js/modules/headerModule.js';
import { MoreButtonModule } from './js/modules/moreButtonModule.js';

export class App extends DOM {
    constructor() {
        super();
        ScrollTrigger.register(gsap);
    }

    init() {
        this.loadHeaderModule();
        this.loadMoreButtonModule();
        this.loadAnimations();
    }

    loadHeaderModule() {
        const tl = gsap.timeline({ paused: true });
        tl
            .from(`.header-anchor__link`, {
                opacity: 0,
                duration: .5,
                x: '-40px',
                stagger: '0.2',
            })
            .from(`.header-payment`, {
                opacity: 0,
                ease: 'power2.in'
            }, '<50%')

        new HeaderModule('#header-page', {
            activeClass: 'header--active',
            toggler: '#header-toggler',
            itemClass: 'header-anchor__link',
            on: {
                open: () => {
                    tl.play();
                },
                close: async () => {
                    tl.reverse();
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(null);
                        }, 700);
                    })
                }
            }
        });
    }

    loadMoreButtonModule() {
        new MoreButtonModule('#more-products', {
            listWrapper: '#featured-products',
            listItems: '.product-card',
            hideClass: 'product-card--hidden',
            itemsToShow: 'all',
        })
    }

    loadAnimations() {
        const mm = gsap.matchMedia(),
            breakpoint = 991;

        mm.add({
            isDesktop: `(min-width: ${breakpoint}px)`,
            isMobile: `(max-width: ${breakpoint - 1}px)`,
        }, (context) => {
            let { isDesktop, isMobile } = context.conditions;
            const tl = gsap.timeline();
            tl
                .from(".banner__figure", {
                    duration: 1,
                    clipPath: "polygon(0 0, 0% 0, 0% 100%, 0% 100%)",
                    ease: 'power2.inOut',
                })
                .from(".banner__button", {
                    opacity: 0,
                    ease: 'power1.in',
                }, '<50%')

            gsap.from('.marquee', {
                duration: 1,
                opacity: 0,
                ease: 'power2.in',
                scrollTrigger: {
                    trigger: '.marquee',
                    start: 'center bottom'
                }
            })

            const products = gsap.utils.toArray('.product-card');
            products.forEach(item => item.classList.remove('product-card--animated'));
            gsap.set('.product-card', { opacity: 0 });
            this.animateCards(isDesktop);

            gsap.from('.featured-products__button', {
                duration: 1,
                opacity: 0,
                ease: 'power2.in',
                scrollTrigger: {
                    trigger: '.featured-products__button',
                    start: 'center bottom'
                }
            })

            const button = this.getTarget('.featured-products__button');
            button.addEventListener('showItems', () => this.animateCards(isDesktop));
        })
    }

    animateCards(isDesktop) {
        const className =
            isDesktop ?
                '.product-card--hidden, .product-card--animated'
                : '.product-card--animated';

        ScrollTrigger.batch(`.product-card:not(${className})`, {
            start: '30% bottom',
            trigger: '.product-card',
            onEnter: batch =>
                gsap.to(batch, {
                    opacity: 1,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power2.in',
                    onComplete: () => batch.forEach(item => item.classList.add('product-card--animated')),
                }),
        });
    }
}