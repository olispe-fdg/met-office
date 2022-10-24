import { DateTime, Duration } from "luxon";
import { APIRep } from "./interface";

export class DataPoint {
	date: DateTime;

	data: {
		feelsLike: number;
		windGust: number;
		relativeHumidity: number;
		temperature: number;
		visibility: string;
		windDirection: string;
		windSpeed: number;
		maxUVIndex: number;
		weatherType: string;
		precipitationProb: number;
	};

	constructor(rep: APIRep, day: DateTime) {
		const minutes = Duration.fromObject({ minutes: parseInt(rep.$) });
		this.date = day.plus(minutes);

		this.data = {
			feelsLike: parseInt(rep.F),
			windGust: parseInt(rep.G),
			relativeHumidity: parseInt(rep.H),
			temperature: parseInt(rep.T),
			visibility: rep.V,
			windDirection: rep.D,
			windSpeed: parseInt(rep.S),
			maxUVIndex: parseInt(rep.U),
			weatherType: rep.W,
			precipitationProb: parseInt(rep.Pp),
		};
	}

	toJSON() {
		return {
			date: this.date.toISO(),
			data: this.data,
		};
	}

	toString() {
		// Unfinished
		return [
			this.date.toFormat("dd/MM/yyyy - HH:mm"),
			`Feels like: ${this.data.feelsLike}`,
		].join("\n");
	}
}
