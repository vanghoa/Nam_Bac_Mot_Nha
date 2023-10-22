/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import './globals.css';
import Script from 'next/script';
import localFont from 'next/font/local';
import Link from 'next/link';
import { Metadata } from 'next';

const bourrasque45est = localFont({
    weight: '100',
    src: './font/Bourrasque-45Est-banh-mi.otf',
    display: 'swap',
    variable: '--45est-font',
});

const bourrasque45ouest = localFont({
    weight: '100',
    src: './font/Bourrasque-45Ouest-banh-mi.otf',
    display: 'swap',
    variable: '--45ouest-font',
});

const acuminBip = localFont({
    variable: '--acuminbip-font',
    src: [
        {
            path: './font/AcuminProCondensed-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './font/AcuminProCondensed-Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
});

export const metadata: Metadata = {
    title: 'Nam Bac Mot Nha',
    description: 'Nam Bac Mot Nha website',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${bourrasque45est.variable} ${bourrasque45ouest.variable} ${acuminBip.variable}`}
            >
                <Script src="/static/layout.js" strategy="beforeInteractive" />
                <div className="left butt">
                    <Link href="/" prefetch={true}>
                        HOME
                    </Link>
                </div>
                <div className="right butt">
                    <Link href="/archive" prefetch={true}>
                        ARCHIVE
                    </Link>
                </div>
                <div className="left butt bot">
                    <Link href="/bleednotes" prefetch={true}>
                        BLEED NOTES
                    </Link>
                </div>
                <div className="right butt bot">
                    <Link href="/mausoleum" prefetch={true}>
                        MAUSOLEUM
                    </Link>
                </div>
                {children}
            </body>
        </html>
    );
}
