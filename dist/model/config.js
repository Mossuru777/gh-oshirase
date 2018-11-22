"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isConfig(o) {
    return o !== undefined &&
        o.hasOwnProperty("google_home_ip") &&
        o.hasOwnProperty("socket_path") &&
        o.hasOwnProperty("tcp_port") &&
        o.hasOwnProperty("tcp_hostname") &&
        o.hasOwnProperty("mythings_secret");
}
exports.isConfig = isConfig;
//# sourceMappingURL=config.js.map