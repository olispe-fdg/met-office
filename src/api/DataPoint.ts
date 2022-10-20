import { DateTime, Duration } from "luxon";
import { APIRep } from "./interface";

export class DataPoint {
	date: DateTime;

	data: {
		feelsLike: string;
		windGust: string;
		relativeHumidity: string;
		temperature: string;
		visibility: string;
		windDirection: string;
		windSpeed: string;
		maxUVIndex: string;
		weatherType: string;
		precipitationProb: string;
	};

	constructor(rep: APIRep, day: DateTime) {
		const minutes = Duration.fromObject({ minutes: parseInt(rep.$) });
		this.date = day.plus(minutes);

		this.data = {
			feelsLike: rep.F,
			windGust: rep.G,
			relativeHumidity: rep.H,
			temperature: rep.T,
			visibility: rep.V,
			windDirection: rep.D,
			windSpeed: rep.S,
			maxUVIndex: rep.U,
			weatherType: rep.W,
			precipitationProb: rep.Pp,
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
