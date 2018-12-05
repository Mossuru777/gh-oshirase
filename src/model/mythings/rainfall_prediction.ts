import {isMyThingsMessageProps, MyThingsMessage, MyThingsMessageProps} from "./mythings_message";
import {sprintf} from "sprintf-js";

export interface RainFallPredictionProps extends MyThingsMessageProps {
    readonly values: [RainFallPredictionDetailProps];
}

export function isRainFallPredictionProps(o: any): o is RainFallPredictionProps {
    return isMyThingsMessageProps(o) && o.values.every(isRainFallPredictionDetailProps);
}

export interface RainFallPredictionDetailProps {
    readonly area: string;
    readonly datetime: string;
    readonly time: string;
    readonly date: string;
    readonly rainfall: string;
}

function isRainFallPredictionDetailProps(o: any): o is RainFallPredictionDetailProps {
    return o.hasOwnProperty("area")
        && o.hasOwnProperty("datetime")
        && o.hasOwnProperty("time")
        && o.hasOwnProperty("date")
        && o.hasOwnProperty("rainfall");
}

export class RainFallPrediction extends MyThingsMessage implements RainFallPredictionProps {
    readonly values: [RainFallPredictionDetailProps];

    constructor(props: RainFallPredictionProps) {
        super(props);
        this.values = props.values;
    }

    toString(): string {
        const detail = this.values[0];
        return sprintf(
            "雨がふる予報が出ています。%sに、%sに、1時間あたり、%sミリ、の雨がふるでしょう。",
            detail.area, detail.time, detail.rainfall
        );
    }
}
