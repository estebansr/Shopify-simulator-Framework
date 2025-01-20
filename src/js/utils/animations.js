import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

/**
 * Animates elements with a fade-in effect when they enter the viewport.
 * 
 * @param {string} selector - The CSS selector of the elements to animate.
 */
export const animateDefault = (selector) => {
    gsap.from(selector, {
        duration: 1,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
            trigger: selector,
            start: 'center bottom'
        }
    })
}

/**
 * Animates the header elements based on the screen width.
 * 
 * @returns {gsap.core.Timeline} - The GSAP timeline instance.
 */
export const animateHeader = () => {
    const tl = gsap.timeline({ paused: true }),
        mm = gsap.matchMedia();

    mm.add('(max-width:990px)', () => {
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
    })
    return tl;
}

/**
 * Animates the banner elements with a clipping and fade-in effect.
 * 
 * @returns {gsap.core.Timeline} - The GSAP timeline instance.
 */
export const animateBanner = () => {
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
}

/**
 * Animates the collection cards with a staggered fade-in effect when they enter the viewport.
 */
export const animateCollectionCards = () => {
    ScrollTrigger.batch(`.collection-card`, {
        start: '30% bottom',
        trigger: '.collection-card',
        onEnter: batch =>
            gsap.to(batch, {
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.in',
            }),
    });
}

/**
 * Animates the featured product cards with a staggered fade-in effect when they enter the viewport.
 * 
 * @param {boolean} isDesktop - A flag indicating if the animation is for desktop view.
 */
export const animateFeaturedCards = (isDesktop) => {
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