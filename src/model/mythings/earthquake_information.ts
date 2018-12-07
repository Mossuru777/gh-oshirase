import { isMyThingsMessageProps, MyThingsMessage, MyThingsMessageProps } from "./mythings_message";
import { sprintf } from "sprintf-js";

export interface EarthQuakeInformationProps extends MyThingsMessageProps {
    readonly values: [EarthQuakeInformationDetailProps];
}

export function isEarthQuakeInformationProps(o: any): o is EarthQuakeInformationProps {
    return isMyThingsMessageProps(o) && o.values.every(isEarthQuakeInformationDetailProps);
}

export interface EarthQuakeInformationDetailProps {
    readonly place_name: string;
    readonly intensity: string;
    readonly max_intensity: string;
    readonly occurrence_date: string;
    readonly occurrence_time: string;
    readonly url: string;
}

function isEarthQuakeInformationDetailProps(o: any): o is EarthQuakeInformationDetailProps {
    return o.hasOwnProperty("place_name") &&
        o.hasOwnProperty("intensity") &&
        o.hasOwnProperty("max_intensity") &&
        o.hasOwnProperty("occurrence_date") &&
        o.hasOwnProperty("occurrence_time") &&
        o.hasOwnProperty("url");
}

export class EarthQuakeInformation extends MyThingsMessage implements EarthQuakeInformationProps {
    readonly values: [EarthQuakeInformationDetailProps];

    constructor(props: EarthQuakeInformationProps) {
        super(props);
        this.values = props.values;
    }

    toString(): string {
        const information = this.values[0];
        return sprintf(
            "地震の情報です。%s %s 発生、最大震度、%s、の地震がありました。%sの震度は、%s、です。",
            information.occurrence_date, information.occurrence_time,
            information.max_intensity, information.place_name, information.intensity
        );
    }
}
