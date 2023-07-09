'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const PathnameScript = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        const range = document.querySelectorAll(`.butt a`);
        for (let i = 0; i < range.length; i++) {
            if (range[i].pathname == pathname) {
                range[i].classList.add('selected');
            } else {
                range[i].classList.remove('selected');
            }
        }
    }, [pathname, searchParams]);
    return <></>;
};

export default PathnameScript;
