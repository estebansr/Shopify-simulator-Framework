import './scss/main.scss';
import { App } from './app';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Gradiweb is online!!!');

    const app = new App();
    app.init();
})