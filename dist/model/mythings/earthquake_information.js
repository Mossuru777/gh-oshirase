"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythings_message_1 = require("./mythings_message");
function isEarthQuakeInformation(o) {
    return mythings_message_1.isMyThingsMessage(o) &&
        o.values.every(isEarthQuakeInformationDetail);
}
exports.isEarthQuakeInformation = isEarthQuakeInformation;
function isEarthQuakeInformationDetail(o) {
    return mythings_message_1.isMyThingsMessageDetail(o) &&
        o.hasOwnProperty("occurrence_name") &&
        o.hasOwnProperty("occurrence_date") &&
        o.hasOwnProperty("occurrence_time") &&
        o.hasOwnProperty("intensity") &&
        o.hasOwnProperty("max_intensity") &&
        o.hasOwnProperty("place_name") &&
        o.hasOwnProperty("url");
}
exports.isEarthQuakeInformationDetail = isEarthQuakeInformationDetail;
//# sourceMappingURL=earthquake_information.js.map