'use client';
import { useEffect } from 'react';

const ArchiveScripts = () => {
    useEffect(() => {
        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);
        const $create = document.createElement.bind(document);
        const $createcomment = document.createComment.bind(document);
        const root = document.querySelector(':root');
        const setprop = root.style.setProperty.bind(root.style);
        const proproot = getComputedStyle(root);
        const getprop = proproot.getPropertyValue.bind(proproot);

        const rem = parseFloat(
            getComputedStyle(document.documentElement).fontSize
        );

        const img_arr = $$('#archive img');
        const viewfinder = $('#viewfinder');

        for (let i = 0; i < img_arr.length; i++) {
            img_arr[i].onclick = imgclick;
        }

        viewfinder.onclick = viewfinder_close;

        function imgclick() {
            setprop('--bg-url', `url('${this.src}')`);
            viewfinder.classList.add('open');
        }

        function viewfinder_close() {
            viewfinder.classList.remove('open');
        }
        return () => {
            for (let i = 0; i < img_arr.length; i++) {
                img_arr[i].onclick = null;
            }
            viewfinder.onclick = null;
        };
    }, []);
    return <></>;
};

export default ArchiveScripts;
