import { APIForecast, APIParam } from "./interface";
import { Period } from "./Period";

export class Forecast {
	params: APIParam[];
	periods: Period[];

	constructor(data: APIForecast) {
		this.params = data.Wx.Param;
		this.periods = data.DV.Location.Period.map((period) => new Period(period));
	}

	getNextDataPoint() {
		// TODO: find present day in periods
		return this.periods[0].getNextDataPoint();
	}
}
