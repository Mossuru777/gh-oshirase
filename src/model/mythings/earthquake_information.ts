import {isMyThingsMessage, isMyThingsMessageDetail, MyThingsMessage, MyThingsMessageDetail} from "./mythings_message";

export interface EarthQuakeInformation extends MyThingsMessage {
    readonly values: [EarthQuakeInformationDetail];
}

export function isEarthQuakeInformation(o: any): o is EarthQuakeInformation {
    return isMyThingsMessage(o) &&
        o.values.every(isEarthQuakeInformationDetail);
}

export interface EarthQuakeInformationDetail extends MyThingsMessageDetail {
    readonly occurrence_name: string;
    readonly occurrence_date: string;
    readonly occurrence_time: string;
    readonly intensity: string;
    readonly max_intensity: string;
    readonly place_name: string;
    readonly url: string;
}

export function isEarthQuakeInformationDetail(o: any): o is EarthQuakeInformationDetail {
    return isMyThingsMessageDetail(o) &&
        o.hasOwnProperty("occurrence_name") &&
        o.hasOwnProperty("occurrence_date") &&
        o.hasOwnProperty("occurrence_time") &&
        o.hasOwnProperty("intensity") &&
        o.hasOwnProperty("max_intensity") &&
        o.hasOwnProperty("place_name") &&
        o.hasOwnProperty("url");
}
