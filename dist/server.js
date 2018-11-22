"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ghn = require("google-home-notifier");
const body_parser = require("body-parser");
require("colors");
const express = require("express");
const fs = require("fs");
const http = require("http");
const sprintf_js_1 = require("sprintf-js");
const rainfall_prediction_1 = require("./model/mythings/rainfall_prediction");
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
            if (text !== undefined && rainfall_prediction_1.isRainFallPrediction(text) &&
                req.headers.hasOwnProperty("x-secret") && req.headers["x-secret"] === config.mythings_secret) {
                try {
                    const detail = text.values[0];
                    const speak = sprintf_js_1.sprintf("%sに%sに1時間あたり%sミリの雨がふる予報です。", detail.area, detail.time, detail.rainfall);
                    ghn.ip(config.google_home_ip, this.language);
                    ghn.notify(speak, (notifyRes) => {
                        console.info(notifyRes);
                        res.sendStatus(204);
                    });
                }
                catch (err) {
                    console.error(err);
                    res.sendStatus(500);
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