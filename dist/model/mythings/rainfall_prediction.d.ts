import { MyThingsMessage, MyThingsMessageDetail } from "./mythings_message";
export interface RainFallPrediction extends MyThingsMessage {
    readonly values: [RainFallPredictionDetail];
}
export declare function isRainFallPrediction(o: any): o is RainFallPrediction;
export interface RainFallPredictionDetail extends MyThingsMessageDetail {
    readonly area: string;
    readonly datetime: string;
    readonly time: string;
    readonly date: string;
    readonly rainfall: string;
}
export declare function isRainFallPredictionDetail(o: any): o is RainFallPredictionDetail;
