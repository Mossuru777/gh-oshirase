export interface MyThingsMessage {
    readonly user_id: string;
    readonly service_id: string;
    readonly mythings_id: string;
    readonly values: [MyThingsMessageDetail];

    toString(): string;
}

export function isMyThingsMessage(o: any): o is MyThingsMessage {
    return o !== undefined &&
        Array.isArray(o.values) &&
        o.values.length >= 1 &&
        o.values.every(isMyThingsMessageDetail);
}

export interface MyThingsMessageDetail {
    toString(): string;
}

export function isMyThingsMessageDetail(o: any): o is MyThingsMessageDetail {
    return o !== undefined;
}
