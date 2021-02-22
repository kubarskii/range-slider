import React, {useEffect, useRef, useState} from 'react';
import './temp.css';

export default function Slider(props) {

    const inputRef = useRef<HTMLInputElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    const [isInputFocused, setInputFocused] = useState(false);

    const {values, methods} = props;
    const {updateValue} = methods;
    const {value, maxValue, minValue, suffix, toFixed, defaultValue} = values;

    const fillAddWidth: number = 2;

    let inputValue: string = '';
    let shiftX: number = 0;

    useEffect((): any => {
        if (inputRef && inputRef.current && fillRef && fillRef.current && thumbRef && thumbRef.current && sliderRef && sliderRef.current) {
            const valueNumber: number = (value) ? parseFloat(value) : 0.00;
            const rightEdge = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
            const pxInUnit = rightEdge / (Math.abs(minValue) + Math.abs(maxValue));
            const offset = (valueNumber - minValue) * pxInUnit;

            thumbRef.current.style.left = offset + 'px';
            fillRef.current.style.width = offset + fillAddWidth + 'px';

            if (!value && !isInputFocused) {
                const nVal = defaultValue.toFixed(toFixed).toString().concat(suffix);
                inputRef.current.value = nVal;
                updateValue(nVal);
            } else {
                inputRef.current.value = value
            }
        }
    });

    const handleMouseMove = (event): void => {
        if (fillRef && fillRef.current
            && thumbRef && thumbRef.current
            && sliderRef && sliderRef.current
            && inputRef && inputRef.current) {
            let newLeft = event.clientX - shiftX - sliderRef.current.getBoundingClientRect().left;
            if (newLeft < 0) {
                newLeft = 0;
            }
            let rightEdge = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            const a = (Math.abs(minValue) + maxValue) * (newLeft / rightEdge) + minValue;
            inputValue = a.toFixed(toFixed).concat(suffix);
            updateValue(inputValue);
        }
    }

    const handleMouseUp = (): void => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    }

    const thumbOnMouseDown = function (event): void {
        event.preventDefault();
        if (thumbRef && thumbRef.current) {
            shiftX = event.clientX - thumbRef.current.getBoundingClientRect().left;
        }
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleSliderClick = function (event): void {
        if (sliderRef && sliderRef.current) {
            const shift = event.clientX - sliderRef.current.getBoundingClientRect().left;
            const rightEdge = sliderRef.current.offsetWidth
            const pxInUnit = rightEdge / (Math.abs(minValue) + Math.abs(maxValue));
            updateValue((shift / pxInUnit + minValue).toFixed(toFixed).concat(suffix))
        }
    }

    const prepareAndUpdateValue = (v: string): string => {
        let value = (v !== suffix && v !== '') ?
            v.replace(suffix, '')
                .replace(/(^\b0+(?=[1-9]\d*)|(?<=\W\d{2}).*)/, '')
                .replace(/^\./, '0.')
                .substr(0, 6)
                .concat(suffix) : '';
        const fpValue = parseFloat(value);
        if (!isNaN(fpValue) && fpValue > maxValue) {
            value = maxValue.toFixed(toFixed).toString().concat(suffix)
        } else if (!isNaN(fpValue) && fpValue < minValue) {
            value = minValue.toFixed(toFixed).toString().concat(suffix)
        }
        updateValue(value);
        return value
    }

    const handleInputChange = (e) => {
        const {target: {value}} = e;
        e.target.value = prepareAndUpdateValue(value);
    }

    const handleKeydown = (e) => {

        const {value, selectionStart} = e.target;
        if (selectionStart === value.length && value[value.length - 1] === suffix) {
            changeCursorPosition(e, value.length - 1);
            return;
        }

    }

    const handleInputBlur = (e) => {
        prepareAndUpdateValue(parseFloat(value || '0').toFixed(toFixed).toString());
        setInputFocused(false)
    }

    const changeCursorPosition = (e, start: number, end?: number) => {
        if (!end) end = start;
        e.target.selectionStart = start;
        e.target.selectionEnd = end;
    }

    const normalizeValue = (value) => {
        if (sliderRef && sliderRef.current && thumbRef && thumbRef.current) {
            const valueNumber: number = (value) ? parseFloat(value) : 0;
            const sum = Math.abs(minValue) + Math.abs(maxValue);
            return (valueNumber - minValue) / sum * 100;
        }
        return 0;
    }

    return (
        <div className="flex">
            <div
                className="flex w-286px m-auto box-border rounded-2xl border border-gray-200 dark:bg-gray-800 dark:border-gray-400"
                style={{padding: '35px 30px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}
            >
                <div
                    className="slider flex-shrink-0 my-auto bg-gray-200 m-r-22px"
                    onClick={handleSliderClick}
                    ref={sliderRef}
                >
                    <div className="flex">
                        <div
                            className="bg-blue-600 fill"
                            ref={fillRef}
                        />
                        <div
                            onMouseDown={thumbOnMouseDown}
                            onDragStart={() => false}
                            className="thumb relative cursor-pointer bg-white border rounded border-blue-600 z-50"
                            ref={thumbRef}
                        />
                    </div>
                    <div className="dots flex justify-between">
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(normalizeValue(value) > minValue) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(normalizeValue(value) > 25) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(normalizeValue(value) > 50) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(normalizeValue(value) > 75) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(normalizeValue(value) > 99.9) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                    </div>
                </div>
                <div className="flex box-border w-15 border border-gray-200 dark:border-gray-400 rounded-lg">
                    <div className="flex m-auto pt-2 pb-2 pl-2" style={{width: '62px', height: '36px'}}>
                        <input
                            className="bg-transparent min-w-0 w-auto text-xs my-auto h-18px outline-none"
                            type="text"
                            ref={inputRef}
                            onKeyUp={handleInputChange}
                            onKeyDown={handleKeydown}
                            onFocus={_ => setInputFocused(true)}
                            onBlur={handleInputBlur}
                        />
                    </div>
                </div>
            </div>

        </div>
    )

}
