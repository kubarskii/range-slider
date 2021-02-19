import React, {useEffect, useRef} from 'react';
import './temp.css';

export default function Slider(props) {

    const inputRef = useRef<HTMLInputElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    const {values, methods} = props;
    const {updateValue} = methods;
    const {value, postfix} = values;

    const fillAddWidth = 2;
    const maxValue = 100;
    const minValue = 0;

    let inputValue: string = ''
    let shiftX: number = 0;

    useEffect((): any => {
        if (fillRef && fillRef.current && thumbRef && thumbRef.current && sliderRef && sliderRef.current) {
            const rightEdge = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
            const offset = rightEdge * value / 100;
            thumbRef.current.style.left = offset + 'px';
            fillRef.current.style.width = offset + fillAddWidth + 'px';
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
            inputValue = (newLeft / rightEdge * 100).toFixed(2);
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
            updateValue((shift / rightEdge * 100).toFixed(2))
        }
    }

    const updateValueMask = (event) => {
        const {target: {value}, nativeEvent: {data}} = event;
        if (typeof parseFloat(value) === 'number') {
            if (value === "") {
                updateValue("")
            } else if (value <= maxValue && value >= minValue) {
                const str = value.toString();
                const reg = new RegExp(/(.*)\.\d\d\d/);
                if (!reg.test(str)) {
                    updateValue(value)
                }
            } else if (value > maxValue) {
                updateValue(maxValue.toFixed(2))
            } else if (value < minValue) {
                updateValue(minValue.toFixed(2))
            }
        }
    }

    return (
        <div className="flex">
            <div
                className="flex m-auto box-border rounded-2xl border border-gray-200 dark:bg-gray-800 dark:border-gray-400"
                style={{width: '286px', padding: '35px 30px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}
            >
                <div
                    className="slider flex-shrink-0 my-auto bg-gray-200 cursor-pointer m-r-22px"
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
                            className="thumb bg-white border rounded border-blue-600 z-50"
                            ref={thumbRef}
                        />
                    </div>
                    <div className="dots flex justify-between">
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(value > 0) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(value > 25) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(value > 50) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(value > 75) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                        <div
                            className={`w-6px h-6px relative rounded-full -top-2 ${(value > 99) ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white'}`}
                        />
                    </div>
                </div>
                <div className="flex box-border p-2 w-15 border border-gray-200 dark:border-gray-400 rounded-lg">
                    <input
                        className="bg-transparent text-xs w-full m-auto h-18px outline-none"
                        type="text"
                        ref={inputRef}
                        value={value}
                        onChange={(e) => updateValueMask(e)}
                        onBlur={(e) => updateValue(parseFloat(value).toFixed(2))}
                    />
                </div>
            </div>

        </div>
    )

}
