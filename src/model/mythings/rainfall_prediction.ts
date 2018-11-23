import {isMyThingsMessage, isMyThingsMessageDetail, MyThingsMessage, MyThingsMessageDetail} from "./mythings_message";

export interface RainFallPrediction extends MyThingsMessage {
    readonly values: [RainFallPredictionDetail];
}

export function isRainFallPrediction(o: any): o is RainFallPrediction {
    return isMyThingsMessage(o) &&
        o.values.every(isRainFallPredictionDetail);
}

export interface RainFallPredictionDetail extends MyThingsMessageDetail {
    readonly area: string;
    readonly datetime: string;
    readonly time: string;
    readonly date: string;
    readonly rainfall: string;
}

export function isRainFallPredictionDetail(o: any): o is RainFallPredictionDetail {
    return isMyThingsMessageDetail(o) &&
        o.hasOwnProperty("area") &&
        o.hasOwnProperty("datetime") &&
        o.hasOwnProperty("time") &&
        o.hasOwnProperty("date") &&
        o.hasOwnProperty("rainfall");
}
