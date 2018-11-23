"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythings_message_1 = require("./mythings_message");
function isRainFallPrediction(o) {
    return mythings_message_1.isMyThingsMessage(o) &&
        o.values.every(isRainFallPredictionDetail);
}
exports.isRainFallPrediction = isRainFallPrediction;
function isRainFallPredictionDetail(o) {
    return mythings_message_1.isMyThingsMessageDetail(o) &&
        o.hasOwnProperty("area") &&
        o.hasOwnProperty("datetime") &&
        o.hasOwnProperty("time") &&
        o.hasOwnProperty("date") &&
        o.hasOwnProperty("rainfall");
}
exports.isRainFallPredictionDetail = isRainFallPredictionDetail;
//# sourceMappingURL=rainfall_prediction.js.map