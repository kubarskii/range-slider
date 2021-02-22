import React, {Component} from 'react';
import ThemeSwitcher from "./theme-switcher/ThemeSwitcher.component";
import ConsumerProps from "../../interfaces/consumerProps.interface";
import {Consumer} from "../../decorators/consumer.decorator";
import Slider from "./Slider.component";
import {BindMethod} from "../../decorators/bindMethod.decorator";

@Consumer
class SliderWrapper extends Component<ConsumerProps> {
    constructor(props: ConsumerProps) {
        super(props);
    }

    state: { value: string } = {
        value: '',
    }


    @BindMethod
    updateValue(value: string) {
        this.setState(_ => ({value}))
    }

    render() {
        return (
            <div className="bg-white text-grey-900 dark:bg-black dark:text-white">
                <div className="flex">
                    <div className="my-auto m-r-25px">
                        <ThemeSwitcher/>
                    </div>
                    <Slider
                        values={{
                            ...this.state,
                            maxValue: 100,
                            minValue: 0,
                            defaultValue: 50,
                            suffix: '%',
                            toFixed: 2,
                        }}
                        methods={{
                            updateValue: this.updateValue,
                        }}
                    />
                </div>
            </div>

        );
    }

}

export default SliderWrapper;
