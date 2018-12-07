import * as ghn from "google-home-notifier";
import * as body_parser from "body-parser";
import "colors";
import * as express from "express";
import * as fs from "fs";
import * as http from "http";
import {sprintf} from "sprintf-js";
import {Config} from "./model/config";
import {isMyThingsMessageProps, MyThingsMessage} from "./model/mythings/mythings_message";
import {isRainFallPredictionProps, RainFallPrediction} from "./model/mythings/rainfall_prediction";
import {EarthQuakeInformation, isEarthQuakeInformationProps} from "./model/mythings/earthquake_information";

export class Server {
    private readonly language = "ja";

    private readonly app = express();
    private readonly socket_http_server: http.Server | undefined;
    private readonly tcp_http_server: http.Server | undefined;

    constructor(config: Config) {
        ghn.device(config.google_home_name, this.language);

        const json_parser = body_parser.json();
        this.app.post("/mythings", json_parser, (req: any, res: any) => {
            if (!req.body) {
                res.sendStatus(400);
                return;
            }

            console.log(req.headers);
            console.log(req.body);

            const text = req.body;
            if (text !== undefined && isMyThingsMessageProps(text)
                && req.headers.hasOwnProperty("x-secret") && req.headers["x-secret"] === config.mythings_secret) {
                let message: MyThingsMessage;
                if (isRainFallPredictionProps(text)) {
                    message = new RainFallPrediction(text);
                } else if (isEarthQuakeInformationProps(text)) {
                    message = new EarthQuakeInformation(text);
                } else {
                    console.error("Unknown MyThings Message Type");
                    res.sendStatus(400);
                    return;
                }

                console.info(`Speak: ${message.toString()}`);
                const speak = (try_retrying: boolean) => {
                    ghn.notify(message.toString(), (notifyRes: any) => {
                        if (notifyRes !== "error") {
                            console.info(notifyRes);
                            res.sendStatus(204);
                        } else if (try_retrying) {
                            speak(false);
                        } else {
                            console.error(notifyRes);
                            res.sendStatus(503);
                        }
                    });
                };
                speak(!ghn.deviceAddress);
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
