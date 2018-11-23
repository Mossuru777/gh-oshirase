import { MyThingsMessage, MyThingsMessageDetail } from "./mythings_message";
export interface EarthQuakeInformation extends MyThingsMessage {
    readonly values: [EarthQuakeInformationDetail];
}
export declare function isEarthQuakeInformation(o: any): o is EarthQuakeInformation;
export interface EarthQuakeInformationDetail extends MyThingsMessageDetail {
    readonly occurrence_name: string;
    readonly occurrence_date: string;
    readonly occurrence_time: string;
    readonly intensity: string;
    readonly max_intensity: string;
    readonly place_name: string;
    readonly url: string;
}
export declare function isEarthQuakeInformationDetail(o: any): o is EarthQuakeInformationDetail;
