import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import ArchiveScripts from '@/components/archive';

export default async function Home() {
    const files = fs.readdirSync(path.join('public/static/img'));
    return (
        <>
            <ArchiveScripts></ArchiveScripts>
            <div id="viewfinder" className="outerdiv">
                <div></div>
            </div>
            <div id="archive" className="outerdiv">
                <section>
                    {Array.from(files, (v, i) => (
                        <div
                            key={i + '_pic'}
                            style={{
                                left: `${
                                    Math.round(Math.random() * 40) * 2.5
                                }%`,
                                top: `${Math.round(Math.random() * 40) * 2.5}%`,
                            }}
                        >
                            <Image
                                src={`/static/img/${v}`}
                                alt="hinh archive"
                                key={i + '_pic'}
                                width={0}
                                height={0}
                                sizes="15vmax"
                                style={{
                                    width: '15vmax',
                                    height: 'auto',
                                }}
                            ></Image>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}
