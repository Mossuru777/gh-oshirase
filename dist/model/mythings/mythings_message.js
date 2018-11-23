"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isMyThingsMessage(o) {
    return o !== undefined &&
        Array.isArray(o.values) &&
        o.values.length >= 1 &&
        o.values.every(isMyThingsMessageDetail);
}
exports.isMyThingsMessage = isMyThingsMessage;
function isMyThingsMessageDetail(o) {
    return o !== undefined;
}
exports.isMyThingsMessageDetail = isMyThingsMessageDetail;
//# sourceMappingURL=mythings_message.js.map