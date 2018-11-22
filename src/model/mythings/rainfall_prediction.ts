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

export function isRainFallPrediction(o: any): o is RainFallPrediction {
    return o !== undefined &&
        o.hasOwnProperty("user_id") &&
        o.hasOwnProperty("service_id") &&
        o.hasOwnProperty("mythings_id") &&
        o.hasOwnProperty("values") &&
        Array.isArray(o.values) &&
        o.values.length >= 1 &&
        o.values.every(isRainFallPredictionDetail);
}

function isRainFallPredictionDetail(o: any): o is RainFallPredictionDetail {
    return o !== undefined &&
        o.hasOwnProperty("area") &&
        o.hasOwnProperty("datetime") &&
        o.hasOwnProperty("time") &&
        o.hasOwnProperty("date") &&
        o.hasOwnProperty("rainfall");
}
