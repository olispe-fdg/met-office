import { APIForecast } from "./APIForecast.interface";
import { Period, PeriodRep } from "./Period";

export class Forecast {
    params;
    periods;

    constructor(data: APIForecast) {
        this.params = data.Wx.Param;
        this.periods = data.DV.Location.Period.map(
            (period) => new Period(period)
        );
    }

    getNextRep() {
        return this.periods[0].getNextRep();
    }

    formatRep(rep: PeriodRep) {}
}
