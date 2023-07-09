//'use client';
import Image from 'next/image';
import Script from 'next/script';
import fs from 'fs';
import path from 'path';

export default async function Home() {
    const files = fs.readdirSync(path.join('public/static/img_bleed'));
    return (
        <>
            <div id="bleednotes" className="outerdiv">
                {Array.from({ length: files.length }, (v, i) => (
                    <Image
                        src={`/static/img_bleed/_${i + 1}.jpg`}
                        alt="hinh sech"
                        key={i + '_pic'}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: 'auto',
                            height: '100%',
                        }}
                    ></Image>
                ))}
            </div>
        </>
    );
}