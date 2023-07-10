'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $create = document.createElement.bind(document);
const $createcomment = document.createComment.bind(document);
const root = document.querySelector(':root');
const setprop = root.style.setProperty.bind(root.style);
const proproot = getComputedStyle(root);
const getprop = proproot.getPropertyValue.bind(proproot);
const main = $('main');

setprop(
    '--background',
    `url("/static/img/_${Math.floor(Math.random() * 117 + 1)}.jpg")`
);
viewportheight();
rmvpadding();

function rmvpadding() {
    if (main.offsetWidth === document.body.offsetWidth) {
        document.body.classList.add('rmvpadding');
    } else {
        document.body.classList.remove('rmvpadding');
    }
    viewportheight();
}

function viewportheight() {
    setprop('--vh', `${innerHeight * 0.01}px`);
}

window.addEventListener('resize', rmvpadding);
