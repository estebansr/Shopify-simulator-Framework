import './scss/main.scss';
import { HeaderModule } from './js/modules/headerModule.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Gradiweb is online!!!');

    new HeaderModule('#header-page', {
        activeClass: 'header--active',
        toggler: '#header-toggler',
    });
})