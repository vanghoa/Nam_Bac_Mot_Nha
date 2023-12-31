import Image from 'next/image';
import Myscripts from '@/components/script';
import { Fragment, Key, Suspense } from 'react';
import Link from 'next/link';

type bulletcountnth = {
    [`nth0`]: number;
    [`nth1`]: number;
    [`nth2`]: number;
    [`nth3`]: number;
    [`nth4`]: number;
    [`nth5`]: number;
    [`nth6`]: number;
    [`nth7`]: number;
    [`nth8`]: number;
    [`nth9`]: number;
};

async function getData() {
    const res = await fetch(`${process.env.FETCH_URL}/api/doc`, {
        cache: 'no-store',
    });
    try {
        return await res.json();
    } catch (err) {
        console.log('err: ', err);
        return undefined;
    }
}

async function Wrapper() {
    const data = await getData();
    if (data == undefined) {
        return (
            <p className="loadfail">
                Google Doc has failed us... Please refresh!
            </p>
        );
    }
    const { message: all } = data;

    let {
        title,
        body: { content },
        inlineObjects,
        lists,
        positionedObjects,
    } = all;
    content = content.slice(23);

    const bulletcount: {
        [key: string]: bulletcountnth;
    } = {};
    const NTH = {
        UPPER_ALPHA(num: number) {
            let s = '',
                t;
            while (num > 0) {
                t = (num - 1) % 26;
                s = String.fromCharCode(65 + t) + s;
                num = ((num - t) / 26) | 0;
            }
            return s || undefined;
        },
        ALPHA(num: number) {
            return this.UPPER_ALPHA(num)?.toLowerCase() || undefined;
        },
        UPPER_ROMAN(num: number) {
            let lookup = {
                    M: 1000,
                    CM: 900,
                    D: 500,
                    CD: 400,
                    C: 100,
                    XC: 90,
                    L: 50,
                    XL: 40,
                    X: 10,
                    IX: 9,
                    V: 5,
                    IV: 4,
                    I: 1,
                },
                roman = '',
                i;
            for (i in lookup) {
                while (num >= lookup[i as keyof typeof lookup]) {
                    roman += i;
                    num -= lookup[i as keyof typeof lookup];
                }
            }
            return roman;
        },
        ROMAN(num: number) {
            return this.UPPER_ROMAN(num).toLowerCase();
        },
        ZERO_DECIMAL(num: number) {
            return num.toString().padStart(2, '0');
        },
        DECIMAL(num: number) {
            return num;
        },
        NONE(num: number) {
            return '';
        },
        GLYPH_TYPE_UNSPECIFIED(num: number) {
            return '';
        },
    };
    return (
        <>
            <Myscripts></Myscripts>
            <header>
                <h1>Creative Process Journal - Nam Bắc Một Nhà</h1>
                <h3>
                    <br></br>
                    Work documentation, thought processes, random notes &
                    readings by Bảo Anh for his final year project @ LASALLE
                    College of the Arts, Singapore, 2023 - Nam Bắc Một Nhà. The
                    content represents only a portion of the author&apos;s
                    perspective at the time of its writing and may not encompass
                    the entirety of his viewpoint at the moment. As you navigate
                    through the document, you will witness significant shifts in
                    perspective, showcasing the evolving nature of a process
                    journal over the lifespan of this project &#40;and even
                    beyond&#41;. As the project is a culmination of diverse
                    resources ranging from the Internet to people IRL, done for
                    a speculative purpose &#40;for fun&#41;, its intention is
                    not to draw definitive conclusions or dismiss any statement.
                    Rather, it aims to provide a middleman&apos;s spot, a 2.5th
                    perspective to observe this whole obscurity and complexity
                    of the issue.
                    <br></br>
                    <br></br>
                    Typefaces used are Bourrasque by Bureau Brut & Acumin Pro
                    Condensed by Robert Slimbach, Adobe Fonts. Other external
                    material citations can be found throughout this document. If
                    you find it hard to read, I recommend turning to the page{' '}
                    <Link href="/mausoleum" prefetch={true}>
                        MAUSOLEUM
                    </Link>{' '}
                    for a more comfortable experience. If you want to have a
                    chat or simply just tell me how you feel about anything
                    regarding my project, feel free to reach me at{' '}
                    <a
                        href="https://www.instagram.com/bao.anh.bui/"
                        target="_blank"
                    >
                        @bao.anh.bui
                    </a>{' '}
                    on Instagram.
                </h3>
            </header>
            {content?.map(
                ({ paragraph }: any, index: Key | null | undefined) => {
                    if (!paragraph) {
                        return <Fragment key={`${index}Frag`}></Fragment>;
                    }

                    let bullet = {
                        is: false,
                        data: '',
                        level: 0,
                    };
                    if (paragraph.bullet) {
                        let id: string = paragraph.bullet.listId;
                        let outcome: string | number = '';
                        let level = (bullet.level = paragraph.bullet
                            .nestingLevel
                            ? paragraph.bullet.nestingLevel
                            : 0);
                        bullet.is = true;
                        if (bulletcount[id]) {
                            for (let i = 9; i > level; i--) {
                                bulletcount[id][
                                    `nth${i}` as keyof bulletcountnth
                                ] = 0;
                            }
                        } else {
                            bulletcount[id] = {
                                [`nth0`]: 0,
                                [`nth1`]: 0,
                                [`nth2`]: 0,
                                [`nth3`]: 0,
                                [`nth4`]: 0,
                                [`nth5`]: 0,
                                [`nth6`]: 0,
                                [`nth7`]: 0,
                                [`nth8`]: 0,
                                [`nth9`]: 0,
                            };
                        }
                        let nth = ++bulletcount[id][
                            `nth${level}` as keyof bulletcountnth
                        ];
                        let data =
                            lists[id].listProperties.nestingLevels[level];

                        if (data.glyphType) {
                            outcome =
                                NTH[data.glyphType as keyof typeof NTH](nth) ??
                                '';
                        } else if (data.glyphSymbol) {
                            outcome = data.glyphSymbol;
                        }
                        bullet.data = data.glyphFormat.replace(
                            `%${level}`,
                            outcome
                        );
                    }

                    const para_arr = [];
                    if (bullet.is) {
                        para_arr.push(bullet.data + ' ');
                    }
                    let img_arr = [];

                    paragraph?.elements.map(
                        ({
                            endIndex,
                            startIndex,
                            textRun,
                            inlineObjectElement: img,
                        }: any) => {
                            if (textRun) {
                                if (
                                    textRun.content == '\n' ||
                                    textRun.content == ''
                                ) {
                                    return;
                                }
                                let content = textRun.content;
                                let tag;
                                if (textRun.textStyle.link) {
                                    tag = (
                                        <a
                                            target="_blank"
                                            href={textRun.textStyle.link.url}
                                            rel="noopener noreferrer"
                                            key={`${startIndex}_${endIndex}`}
                                        >
                                            {content}
                                        </a>
                                    );
                                } else {
                                    tag = content;
                                }
                                para_arr.push(tag);
                            } else if (img) {
                                img_arr.push(
                                    <div
                                        className="img_outer"
                                        key={img.inlineObjectId}
                                    >
                                        <Image
                                            src={
                                                inlineObjects[
                                                    `${img.inlineObjectId}`
                                                ].inlineObjectProperties
                                                    .embeddedObject
                                                    .imageProperties.contentUri
                                            }
                                            alt="Picture of the author"
                                            className="img"
                                            key={img.inlineObjectId}
                                            sizes="30vw"
                                            fill={true}
                                            unoptimized={true}
                                        />
                                    </div>
                                );
                            }
                        }
                    );

                    if (Object.hasOwn(paragraph, 'positionedObjectIds')) {
                        img_arr.push(
                            <div
                                className="img_outer"
                                key={paragraph.positionedObjectIds}
                            >
                                <Image
                                    src={
                                        positionedObjects[
                                            `${paragraph.positionedObjectIds}`
                                        ].positionedObjectProperties
                                            .embeddedObject.imageProperties
                                            .contentUri
                                    }
                                    alt="Picture of the author"
                                    className="img_"
                                    key={paragraph.positionedObjectIds}
                                    sizes="30vw"
                                    fill={true}
                                    unoptimized={true}
                                />
                            </div>
                        );
                    }

                    return (
                        <Fragment key={`${index}Frag`}>
                            {para_arr.length > 0
                                ? (() => {
                                      let Paratag: any;
                                      switch (
                                          paragraph.paragraphStyle
                                              .namedStyleType
                                      ) {
                                          case 'HEADING_1':
                                              Paratag = 'h1';
                                              break;
                                          case 'HEADING_2':
                                              Paratag = 'h2';
                                              break;
                                          case 'HEADING_3':
                                              Paratag = 'h3';
                                              break;
                                          default:
                                              Paratag = 'p';
                                      }
                                      return (
                                          <Paratag
                                              key={index}
                                              custom-tt={index}
                                              className={
                                                  bullet.is
                                                      ? `indent_${bullet.level}`
                                                      : ''
                                              }
                                          >
                                              {para_arr}
                                          </Paratag>
                                      );
                                  })()
                                : ''}

                            {img_arr.length > 0 ? ( //
                                <>{img_arr}</>
                            ) : (
                                ''
                            )}
                        </Fragment>
                    );
                }
            )}
        </>
    );
}

export default function Home() {
    return (
        <>
            <p className="excld" id="maximum_char">
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
            <div className="left excld">
                <div id="range-slider1" className="single-thumb"></div>
            </div>
            <div className="right excld">
                <div id="range-slider2" className="single-thumb"></div>
            </div>
            <div id="scroller">
                <div></div>
            </div>
            <div id="wrapper">
                <Suspense
                    key={`${Math.random()}suspense`}
                    fallback={<p className="loadingstate"></p>}
                >
                    <Wrapper></Wrapper>
                </Suspense>
            </div>
        </>
    );
}
