import './scss/main.scss';
import { HeaderModule } from './js/modules/headerModule.js';
import { MoreButtonModule } from './js/modules/moreButtonModule.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Gradiweb is online!!!');

    new HeaderModule('#header-page', {
        activeClass: 'header--active',
        toggler: '#header-toggler',
    });

    new MoreButtonModule('#more-products', {
        listWrapper: '#featured-products',
        listItems: '.product-card',
        hideClass: 'product-card--hidden',
        itemsToShow: 'all',
    })
})