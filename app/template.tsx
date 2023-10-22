'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    useEffect(() => {
        const range: NodeListOf<HTMLAnchorElement> =
            document.querySelectorAll(`.butt a`);
        for (let i = 0; i < range.length; i++) {
            if (range[i].pathname == pathname) {
                range[i].classList.add('selected');
            } else {
                range[i].classList.remove('selected');
            }
        }
    }, [pathname]);
    return <main>{children}</main>;
}
