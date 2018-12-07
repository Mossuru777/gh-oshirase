"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythings_message_1 = require("./mythings_message");
const sprintf_js_1 = require("sprintf-js");
function isEarthQuakeInformationProps(o) {
    return mythings_message_1.isMyThingsMessageProps(o) && o.values.every(isEarthQuakeInformationDetailProps);
}
exports.isEarthQuakeInformationProps = isEarthQuakeInformationProps;
function isEarthQuakeInformationDetailProps(o) {
    return o.hasOwnProperty("place_name") &&
        o.hasOwnProperty("intensity") &&
        o.hasOwnProperty("max_intensity") &&
        o.hasOwnProperty("occurrence_date") &&
        o.hasOwnProperty("occurrence_time") &&
        o.hasOwnProperty("url");
}
class EarthQuakeInformation extends mythings_message_1.MyThingsMessage {
    constructor(props) {
        super(props);
        this.values = props.values;
    }
    toString() {
        const information = this.values[0];
        return sprintf_js_1.sprintf("地震の情報です。%s %s 発生、最大震度、%s、の地震がありました。%sの震度は、%s、です。", information.occurrence_date, information.occurrence_time, information.max_intensity, information.place_name, information.intensity);
    }
}
exports.EarthQuakeInformation = EarthQuakeInformation;
