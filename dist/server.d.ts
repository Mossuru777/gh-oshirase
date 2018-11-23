import "colors";
import { Config } from "./model/config";
import { MyThingsMessage } from "./model/mythings/mythings_message";
export declare class Server {
    private readonly language;
    private readonly app;
    private readonly socket_http_server;
    private readonly tcp_http_server;
    constructor(config: Config);
    static getMyThingsMessageString(o: MyThingsMessage): string;
    stop(): void;
}
