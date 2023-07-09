'use client';
import { useEffect } from 'react';

const MausoleumScripts = () => {
    useEffect(() => {
        const $ = document.querySelector.bind(document);
        const main = $('main');
        main?.classList.add('mausoleum');
        return () => {
            main?.classList.remove('mausoleum');
        };
    }, []);
    return <></>;
};

export default MausoleumScripts;
