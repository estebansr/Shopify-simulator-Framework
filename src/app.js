import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

import { animateHeader, animateBanner, animateDefault, animateFeaturedCards, animateCollectionCards } from './js/utils/animations.js';

import { DOM } from "./js/utils/dom.js";
import { HeaderModule } from './js/modules/headerModule.js';
import { ListModule } from './js/modules/listModule.js';

export class App extends DOM {
    constructor() {
        super();
        ScrollTrigger.register(gsap);
    }

    init() {
        this.loadHeaderModule();
        this.loadListModule();
        this.loadScrolledAnimations();
    }

    loadHeaderModule() {
        const tl = animateHeader();

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

    loadListModule() {
        new ListModule('#featured-products', {
            hideClass: 'product-card--hidden',
            moreButton: '#more-products'
        })
    }

    loadScrolledAnimations() {
        const mm = gsap.matchMedia(),
            breakpoint = 991;

        mm.add({
            isDesktop: `(min-width: ${breakpoint}px)`,
            isMobile: `(max-width: ${breakpoint - 1}px)`,
        }, (context) => {
            let { isDesktop, isMobile } = context.conditions;

            animateBanner();

            animateDefault('.marquee');

            const products = gsap.utils.toArray('.product-card');
            products.forEach(item => item.classList.remove('product-card--animated'));
            gsap.set('.product-card, .collection-card', { opacity: 0 });
            animateFeaturedCards(isDesktop);

            animateDefault('.featured-products__button');

            animateCollectionCards();

            animateDefault('.latest-collection__title');

            const button = this.getTarget('.featured-products__button');
            button.addEventListener('showItems', () => animateFeaturedCards(isDesktop));
        })
    }
}