import { MyThingsMessage, MyThingsMessageProps } from "./mythings_message";
export interface EarthQuakeInformationProps extends MyThingsMessageProps {
    readonly values: [EarthQuakeInformationDetailProps];
}
export declare function isEarthQuakeInformationProps(o: any): o is EarthQuakeInformationProps;
export interface EarthQuakeInformationDetailProps {
    readonly place_name: string;
    readonly intensity: string;
    readonly max_intensity: string;
    readonly occurrence_date: string;
    readonly occurrence_time: string;
    readonly url: string;
}
export declare class EarthQuakeInformation extends MyThingsMessage implements EarthQuakeInformationProps {
    readonly values: [EarthQuakeInformationDetailProps];
    constructor(props: EarthQuakeInformationProps);
    toString(): string;
}
