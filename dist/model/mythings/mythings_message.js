"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isMyThingsMessageProps(o) {
    return o !== undefined && Array.isArray(o.values) && o.values.length >= 1;
}
exports.isMyThingsMessageProps = isMyThingsMessageProps;
class MyThingsMessage {
    constructor(props) {
        this.user_id = props.user_id;
        this.service_id = props.service_id;
        this.mythings_id = props.mythings_id;
        this.values = props.values;
    }
}
exports.MyThingsMessage = MyThingsMessage;
