import * as ghn from "google-home-notifier";
import * as body_parser from "body-parser";
import "colors";
import * as express from "express";
import * as fs from "fs";
import * as http from "http";
import {sprintf} from "sprintf-js";
import {Config} from "./model/config";
import {isRainFallPrediction, RainFallPrediction} from "./model/mythings/rainfall_prediction";

export class Server {
    private readonly language = "ja";

    private readonly app = express();
    private readonly socket_http_server: http.Server | undefined;
    private readonly tcp_http_server: http.Server | undefined;

    constructor(config: Config) {
        const json_parser = body_parser.json();

        this.app.post("/mythings", json_parser, (req: any, res: any) => {
            if (!req.body) {
                return res.sendStatus(400);
            }

            console.log(req.headers);
            console.log(req.body);

            const text = req.body;
            if (text !== undefined && isRainFallPrediction(text) &&
                req.headers.hasOwnProperty("x-secret") && req.headers["x-secret"] === config.mythings_secret) {
                try {
                    const detail = (text as RainFallPrediction).values[0];
                    const speak = sprintf("%sに%sに1時間あたり%sミリの雨がふる予報です。", detail.area, detail.time, detail.rainfall);

                    ghn.ip(config.google_home_ip, this.language);
                    ghn.notify(speak, (notifyRes: any) => {
                        console.info(notifyRes);
                        res.sendStatus(204);
                    });
                } catch (err) {
                    console.error(err);
                    res.sendStatus(500);
                }
            } else {
                res.sendStatus(403);
            }
        });

        this.app.use((_req: any, res: any) => {
            res.sendStatus(404);
        });

        // プロトコルごとにListenできるか試す
        if (config.socket_path) {
            try {
                fs.unlinkSync(config.socket_path);
            } catch (e) {
                if (e.code !== "ENOENT") {
                    throw e;
                }
            }
            try {
                this.socket_http_server = http.createServer(this.app).listen(config.socket_path);
                fs.chmodSync(config.socket_path, 0o777);
            } catch (e) {
                console.warn(e.message);
            }
        }

        const tcp_hostname = config.tcp_hostname || "127.0.0.1";
        if (config.tcp_port) {
            try {
                this.tcp_http_server = http.createServer(this.app).listen(config.tcp_port, tcp_hostname);
            } catch (e) {
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
            listen_info += sprintf(`\
[Unix Domain Socket]
  - %s
  - http+unix://%s

`,
                (config.socket_path as string),
                (config.socket_path as string).replace(/\//g, "%2F")
            ).yellow;
        }
        if (this.tcp_http_server) {
            listen_info += sprintf(`\
[TCP]
  - http://%s:%d/

`,
                tcp_hostname,
                config.tcp_port
            ).yellow;
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
