import { MyThingsMessage, MyThingsMessageProps } from "./mythings_message";
export interface RainFallPredictionProps extends MyThingsMessageProps {
    readonly values: [RainFallPredictionDetailProps];
}
export declare function isRainFallPredictionProps(o: any): o is RainFallPredictionProps;
export interface RainFallPredictionDetailProps {
    readonly area: string;
    readonly datetime: string;
    readonly time: string;
    readonly date: string;
    readonly rainfall: string;
}
export declare class RainFallPrediction extends MyThingsMessage implements RainFallPredictionProps {
    readonly values: [RainFallPredictionDetailProps];
    constructor(props: RainFallPredictionProps);
    toString(): string;
}
