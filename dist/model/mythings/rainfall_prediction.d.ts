export interface RainFallPrediction {
    readonly user_id: string;
    readonly service_id: string;
    readonly mythings_id: string;
    readonly values: [RainFallPredictionDetail];
}
export interface RainFallPredictionDetail {
    readonly area: string;
    readonly datetime: string;
    readonly time: string;
    readonly date: string;
    readonly rainfall: string;
}
export declare function isRainFallPrediction(o: any): o is RainFallPrediction;
