'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PathnameScript = () => {
    const pathname = usePathname();
    useEffect(() => {
        const range: any = document.querySelectorAll(`.butt a`);
        for (let i = 0; i < range.length; i++) {
            if (range[i].pathname == pathname) {
                range[i].classList.add('selected');
            } else {
                range[i].classList.remove('selected');
            }
        }
    }, [pathname]);
    return <></>;
};

export default PathnameScript;
