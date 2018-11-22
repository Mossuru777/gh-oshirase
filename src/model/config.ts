export interface Config {
    readonly google_home_name: string;
    readonly socket_path: string | null;
    readonly tcp_port: number | null;
    readonly tcp_hostname: string | null;
    readonly mythings_secret: string;
}

export function isConfig(o: any): o is Config {
    return o !== undefined &&
        o.hasOwnProperty("google_home_name") &&
        o.hasOwnProperty("socket_path") &&
        o.hasOwnProperty("tcp_port") &&
        o.hasOwnProperty("tcp_hostname") &&
        o.hasOwnProperty("mythings_secret");
}
