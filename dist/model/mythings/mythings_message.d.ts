export interface MyThingsMessage {
    readonly user_id: string;
    readonly service_id: string;
    readonly mythings_id: string;
    readonly values: [MyThingsMessageDetail];
    toString(): string;
}
export declare function isMyThingsMessage(o: any): o is MyThingsMessage;
export interface MyThingsMessageDetail {
    toString(): string;
}
export declare function isMyThingsMessageDetail(o: any): o is MyThingsMessageDetail;
