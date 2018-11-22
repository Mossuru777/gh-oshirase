export interface Config {
    readonly google_home_ip: string;
    readonly socket_path: string | null;
    readonly tcp_port: number | null;
    readonly tcp_hostname: string | null;
    readonly mythings_secret: string;
}
export declare function isConfig(o: any): o is Config;
