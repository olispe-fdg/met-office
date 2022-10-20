import { APIForecast } from "./interface";
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

    formatRep(rep: PeriodRep) {
        const header = rep.date.toFormat("dd/MM/yyyy - HH:mm");

        const params = this.params.map((param) => {
            const name = param.$;
            const value = rep[param.name as keyof PeriodRep];
            return `${name}: ${value}${param.units}`;
        });

        return [header, ...params].join("\n");
    }
}
