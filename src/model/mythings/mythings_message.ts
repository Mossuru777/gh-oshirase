export interface MyThingsMessageProps {
    readonly user_id: string;
    readonly service_id: string;
    readonly mythings_id: string;
    readonly values: [any];
}

export function isMyThingsMessageProps(o: any): o is MyThingsMessageProps {
    return o !== undefined && Array.isArray(o.values) && o.values.length >= 1;
}

export abstract class MyThingsMessage implements MyThingsMessageProps {
    readonly user_id: string;
    readonly service_id: string;
    readonly mythings_id: string;
    readonly values: [any];

    protected constructor(props: MyThingsMessageProps) {
        this.user_id = props.user_id;
        this.service_id = props.service_id;
        this.mythings_id = props.mythings_id;
        this.values = props.values;
    }

    abstract toString(): string;
}
