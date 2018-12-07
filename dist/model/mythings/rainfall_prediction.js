"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythings_message_1 = require("./mythings_message");
const sprintf_js_1 = require("sprintf-js");
function isRainFallPredictionProps(o) {
    return mythings_message_1.isMyThingsMessageProps(o) && o.values.every(isRainFallPredictionDetailProps);
}
exports.isRainFallPredictionProps = isRainFallPredictionProps;
function isRainFallPredictionDetailProps(o) {
    return o.hasOwnProperty("area")
        && o.hasOwnProperty("datetime")
        && o.hasOwnProperty("time")
        && o.hasOwnProperty("date")
        && o.hasOwnProperty("rainfall");
}
class RainFallPrediction extends mythings_message_1.MyThingsMessage {
    constructor(props) {
        super(props);
        this.values = props.values;
    }
    toString() {
        const detail = this.values[0];
        return sprintf_js_1.sprintf("雨がふる予報が出ています。%sに、%sに、1時間あたり、%sミリ、の雨がふるでしょう。", detail.area, detail.time, detail.rainfall);
    }
}
exports.RainFallPrediction = RainFallPrediction;
