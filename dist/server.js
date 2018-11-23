"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ghn = require("google-home-notifier");
const body_parser = require("body-parser");
require("colors");
const express = require("express");
const fs = require("fs");
const http = require("http");
const sprintf_js_1 = require("sprintf-js");
const mythings_message_1 = require("./model/mythings/mythings_message");
const rainfall_prediction_1 = require("./model/mythings/rainfall_prediction");
const earthquake_information_1 = require("./model/mythings/earthquake_information");
class Server {
    constructor(config) {
        this.language = "ja";
        this.app = express();
        const json_parser = body_parser.json();
        this.app.post("/mythings", json_parser, (req, res) => {
            if (!req.body) {
                return res.sendStatus(400);
            }
            console.log(req.headers);
            console.log(req.body);
            const text = req.body;
            if (text !== undefined && mythings_message_1.isMyThingsMessage(text) &&
                req.headers.hasOwnProperty("x-secret") && req.headers["x-secret"] === config.mythings_secret) {
                try {
                    const message = Server.getMyThingsMessageString(text);
                    console.info("Speak: " + message);
                    ghn.ip(config.google_home_ip, this.language);
                    ghn.notify(text, (notifyRes) => {
                        console.info(notifyRes);
                        res.sendStatus(204);
                    });
                }
                catch (err) {
                    console.error(err);
                    res.sendStatus(400);
                }
            }
            else {
                res.sendStatus(403);
            }
        });
        this.app.use((_req, res) => {
            res.sendStatus(404);
        });
        if (config.socket_path) {
            try {
                fs.unlinkSync(config.socket_path);
            }
            catch (e) {
                if (e.code !== "ENOENT") {
                    throw e;
                }
            }
            try {
                this.socket_http_server = http.createServer(this.app).listen(config.socket_path);
                fs.chmodSync(config.socket_path, 0o777);
            }
            catch (e) {
                console.warn(e.message);
            }
        }
        const tcp_hostname = config.tcp_hostname || "127.0.0.1";
        if (config.tcp_port) {
            try {
                this.tcp_http_server = http.createServer(this.app).listen(config.tcp_port, tcp_hostname);
            }
            catch (e) {
                console.warn(e.message);
            }
        }
        if (this.socket_http_server === undefined && this.tcp_http_server === undefined) {
            throw Error("Can't start listening on any protocol. Check your configuration.");
        }
        let listen_info = `
HTTP Server started.
`;
        listen_info += "*** Listen ***\n".yellow;
        if (this.socket_http_server) {
            listen_info += sprintf_js_1.sprintf(`\
[Unix Domain Socket]
  - %s
  - http+unix://%s

`, config.socket_path, config.socket_path.replace(/\//g, "%2F")).yellow;
        }
        if (this.tcp_http_server) {
            listen_info += sprintf_js_1.sprintf(`\
[TCP]
  - http://%s:%d/

`, tcp_hostname, config.tcp_port).yellow;
        }
        console.info(listen_info);
    }
    static getMyThingsMessageString(o) {
        if (rainfall_prediction_1.isRainFallPrediction(o)) {
            const detail = o.values[0];
            return sprintf_js_1.sprintf("雨がふる予報が出ています。%sに、%sに、1時間あたり、%sミリ、の雨がふるでしょう。", detail.area, detail.time, detail.rainfall);
        }
        if (earthquake_information_1.isEarthQuakeInformation(o)) {
            const information = o.values[0];
            return sprintf_js_1.sprintf("地震の情報です。%s %s 発生、%s、を震源とする、最大震度、%s、の地震がありました。%sの震度は、%s、です。", information.occurrence_date, information.occurrence_time, information.occurrence_name, information.max_intensity, information.place_name, information.intensity);
        }
        throw Error("Unknown MyThings Message Type");
    }
    stop() {
        let any_close = false;
        if (this.socket_http_server) {
            this.socket_http_server.close();
            any_close = true;
        }
        if (this.tcp_http_server) {
            this.tcp_http_server.close();
            any_close = true;
        }
        if (any_close) {
            console.info("\n\nHTTP Server stopped.");
        }
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map