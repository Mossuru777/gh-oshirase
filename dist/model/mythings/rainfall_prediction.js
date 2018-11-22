"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isRainFallPrediction(o) {
    return o !== undefined &&
        o.hasOwnProperty("user_id") &&
        o.hasOwnProperty("service_id") &&
        o.hasOwnProperty("mythings_id") &&
        o.hasOwnProperty("values") &&
        Array.isArray(o.values) &&
        o.values.length >= 1 &&
        o.values.every(isRainFallPredictionDetail);
}
exports.isRainFallPrediction = isRainFallPrediction;
function isRainFallPredictionDetail(o) {
    return o !== undefined &&
        o.hasOwnProperty("area") &&
        o.hasOwnProperty("datetime") &&
        o.hasOwnProperty("time") &&
        o.hasOwnProperty("date") &&
        o.hasOwnProperty("rainfall");
}
//# sourceMappingURL=rainfall_prediction.js.map