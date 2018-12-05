export interface MyThingsMessageProps {
    readonly user_id: string;
    readonly service_id: string;
    readonly mythings_id: string;
    readonly values: [any];
}
export declare function isMyThingsMessageProps(o: any): o is MyThingsMessageProps;
export declare abstract class MyThingsMessage implements MyThingsMessageProps {
    readonly user_id: string;
    readonly service_id: string;
    readonly mythings_id: string;
    readonly values: [any];
    protected constructor(props: MyThingsMessageProps);
    abstract toString(): string;
}
