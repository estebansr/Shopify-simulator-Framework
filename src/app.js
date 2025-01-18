import './scss/main.scss';
import { HeaderCollapse } from './js/modules/headerModule.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Gradiweb is online!!!');
    
    new HeaderCollapse('#header-page', {
        activeClass: 'header--active',
        toggler: '#header-toggler'
    });
})