import { APIPeriod } from "./APIPeriod.interface";

export interface APIForecast {
    Wx: {
        Param: {
            name: string;
            unit: string;
            // label for this parameter
            $: string;
        }[];
    };

    DV: {
        dataDate: string;
        type: "Forecast";
        Location: {
            Period: APIPeriod[];
        };
    };
}
