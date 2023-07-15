'use client';
import _ from 'lodash';
import rangeSlider from 'range-slider-input';
import 'range-slider-input/dist/style.css';
import { useEffect } from 'react';

const MyScripts = () => {
    useEffect(() => {
        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);
        const $create = document.createElement.bind(document);
        const $createcomment = document.createComment.bind(document);
        const root: any = document.querySelector(':root');
        const setprop = root?.style.setProperty.bind(root.style);
        const proproot = getComputedStyle(root);
        const getprop = proproot.getPropertyValue.bind(proproot);

        const rem = parseFloat(
            getComputedStyle(document.documentElement).fontSize
        );
        const wrapper: any = $('#wrapper');
        const scroller: any = $('#scroller');
        const main: any = $('main');
        const slider1: any = $('#range-slider1');
        const slider2: any = $('#range-slider2');
        let rangeSliderElement = [
            rangeSlider(slider1, {
                min: 0,
                max: 100,
                step: 1,
                value: [0, 0],
                thumbsDisabled: [true, false],
                rangeSlideDisabled: true,
                onInput: function (value: any, userInteraction: any) {
                    if (userInteraction) {
                        ThumbDragEnd('1', value);
                    }
                },
            }),
            rangeSlider(slider2, {
                min: 0,
                max: 100,
                step: 1,
                value: [0, 0],
                thumbsDisabled: [true, false],
                rangeSlideDisabled: true,
                onInput: function (value: any, userInteraction: any) {
                    if (userInteraction) {
                        ThumbDragEnd('0', value);
                    }
                },
            }),
        ];
        let max_sorem = wrapper.getBoundingClientRect().height / rem;
        let elem_arr: any = $$('main > #wrapper > *:not(.excld)');
        let text_arr: (string | any[])[] = [];
        for (let i = 0; i < elem_arr.length; i++) {
            text_arr.push(elem_arr[i].innerHTML);
        }
        let count = 0;
        let count_single = 0;
        let offset = 200;
        let offsetrem = 0;
        let textNode: any = $('#maximum_char')?.firstChild;
        textNode.textContent = textNode.textContent.trim().replace(/\s+/g, ' ');
        calc_maximum();

        //main.addEventListener('transitionend', maxsoremedit, false);
        setprop('--scroller-h', `${max_sorem + main.offsetHeight / rem}rem`);
        setprop('--scrollbar-w', `${getScrollbarWidth()}px`);
        setprop('--offset', `${0}rem`);
        //
        function mediacheck() {
            document.removeEventListener('wheel', wheel2, true);
            scroller.removeEventListener('scroll', wheel3, false);
            if (
                window.matchMedia(
                    '(pointer: none), (pointer: coarse), (hover:none), (hover:on-demand)'
                ).matches
            ) {
                scroller.addEventListener('scroll', wheel3, false);
            } else {
                document.addEventListener('wheel', wheel2, true);
            }
        }
        mediacheck();
        //
        window.onresize = _.debounce(function () {
            //calc_maximum();
            mediacheck();
            max_sorem = Math.round(
                wrapper.getBoundingClientRect().height / rem
            );
            setprop(
                '--scroller-h',
                `${max_sorem + main.offsetHeight / rem}rem`
            );
            scroller.scrollTo(0, -offsetrem * rem);
            wheelset();
        }, 500);

        function ThumbDragEnd(n: any, vl: number[]) {
            offsetrem = -(vl[1] * max_sorem) / 100;
            scroller.scrollTo(0, -offsetrem * rem);
            setprop('--offset', `${offsetrem}rem`);
            rangeSliderElement[n].value([0, vl[1]]);
        }

        function wheel3() {
            offsetrem = -scroller.scrollTop / rem;
            wheelset();
        }

        function wheel2(e: any) {
            if (e.deltaY < 0) {
                offsetrem += 1.5;
                if (offsetrem >= 0) {
                    offsetrem = 0;
                }
            } else if (e.deltaY > 0) {
                offsetrem -= 1.5;
                if (offsetrem <= -max_sorem) {
                    offsetrem = -max_sorem;
                }
            }
            wheelset();
        }

        function wheelset() {
            let percent = -(100 * offsetrem) / max_sorem;
            rangeSliderElement[0].value([0, percent]);
            rangeSliderElement[1].value([0, percent]);
            setprop('--offset', `${offsetrem}rem`);
        }

        function wheel1(e: any) {
            if (e.deltaY > 0) {
                count_single += offset;
                if (count_single > text_arr[count].length) {
                    elem_arr[count].style.display = 'none';
                    if (++count >= elem_arr.length) {
                        count = elem_arr.length - 1;
                    }
                    count_single = 0;
                }
                elem_arr[count].innerHTML = text_arr[count].slice(
                    count_single,
                    text_arr[count].length
                );
            } else if (e.deltaY < 0) {
                count_single -= offset;
                if (count_single < 0) {
                    elem_arr[count].innerHTML = text_arr[count];
                    elem_arr[count].style.display = 'block';
                    if (--count < 0) {
                        count = 0;
                        count_single = 0;
                    } else {
                        count_single = text_arr[count].length;
                    }
                    elem_arr[count].style.display = 'block';
                }
                elem_arr[count].innerHTML = text_arr[count].slice(
                    count_single,
                    text_arr[count].length
                );
            }
        }

        function calc_maximum() {
            let range = document.createRange();
            let textContent = textNode.textContent;
            let offset_ = 0;
            for (let i = 0; i < textContent.length; i++) {
                range.setStart(textNode, 0);
                range.setEnd(textNode, i + 1);
                if (range.getClientRects().length > 1) {
                    break;
                }
                offset_++;
            }
            offset = offset_;
        }

        function getScrollbarWidth() {
            // Creating invisible container
            const outer: any = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll'; // forcing scrollbar to appear
            outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
            document.body.appendChild(outer);

            // Creating inner element and placing it in the container
            const inner = document.createElement('div');
            outer.appendChild(inner);

            // Calculating difference between container's full width and the child width
            const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

            // Removing temporary elements from the DOM
            outer.parentNode.removeChild(outer);

            return scrollbarWidth;
        }

        function maxsoremedit() {
            let wrapper: any = $('#wrapper');
            max_sorem = wrapper?.offsetHeight / rem;
            setprop(
                '--scroller-h',
                `${max_sorem + main.offsetHeight / rem}rem`
            );
            main.removeEventListener('transitionend', maxsoremedit, false);
        }

        return () => {
            window.onresize = null;
            document.removeEventListener('wheel', wheel2, true);
            scroller.removeEventListener('scroll', wheel3, false);
            //main.removeEventListener('transitionend', maxsoremedit, false);
        };
    }, []);
    return <></>;
};

export default MyScripts;
