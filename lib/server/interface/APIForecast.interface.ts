import { APIParam } from "./APIParam.interface";
import { APIPeriod } from "./APIPeriod.interface";

export interface APIForecast {
	Wx: {
		Param: APIParam[];
	};

	DV: {
		dataDate: string;
		type: "Forecast";
		Location: {
			Period: APIPeriod[];
		};
	};
}
