import { DateTime, Duration } from "luxon";
import { APIPeriod } from "./interface/APIPeriod.interface";
import { DataPoint } from "./DataPoint";

export class Period {
	date: DateTime;
	dataPoints: DataPoint[];

	constructor(data: APIPeriod) {
		// Remove Z from end of iso string to work with luxon
		const iso = data.value.slice(0, -1);
		this.date = DateTime.fromISO(iso);

		this.dataPoints = data.Rep.map((rep) => new DataPoint(rep, this.date));
	}

	getNextDataPoint() {
		const now = DateTime.now().toMillis();

		const nextDataPoint = this.dataPoints.reduce((prev, curr) => {
			const diff = curr.date.toMillis() - now;

			if (diff < 0) {
				return prev;
			}

			if (prev === null) {
				return curr;
			}

			if (diff < prev.date.toMillis() - now) {
				return curr;
			}

			return prev;
		}, null as DataPoint | null);

		if (!nextDataPoint) {
			return this.dataPoints[this.dataPoints.length - 1];
		}

		return nextDataPoint;
	}
}
