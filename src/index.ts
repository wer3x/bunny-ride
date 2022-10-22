import './style.scss';
// import * as PIXI from 'pixi.js';
import {GameManager} from "./core/GameManager";

window.document.addEventListener('DOMContentLoaded', () => {
    console.warn('Dom is Ready --->');
    new GameManager();
});
