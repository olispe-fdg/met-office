import express, { Express, Request, Response, RequestHandler } from "express";

import { Location, LocationJSON } from "./api/Location";
import api from "./api/MetOfficeAPI";

export class Server {
	app: Express;

	constructor() {
		this.app = express();
		this.app.get("/forecast", this.getForecast);
	}

	start(port: number) {
		this.app.listen(port, () => console.log(`Server started on port ${port}`));
	}

	getForecast: RequestHandler = async (request: Request, response: Response) => {
		console.log("Forecasts requested");

		const locations = await api.getLocations();

		const filterKeys = Object.keys(request.query).filter(
			filterKey => Location.hasProperty(filterKey)
		) as (keyof LocationJSON)[];

		const filteredLocations = locations.filter(location => filterKeys.every(filterKey =>
			request.query[filterKey] === location[filterKey]
		));

		const forecasts = filteredLocations.map(async location => {
			const forecastData = await api.getLocationForecast(location);

			return {
				id: location.id,
				name: location.name,
				area: location.area,
				forecast: forecastData.periods.map(period => period.dataPoints.map(dataPoint => dataPoint.toJSON()))
			};
		});

		response.json(await Promise.all(forecasts));
	}
}
