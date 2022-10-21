import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import { handleErrors } from "../../lib/server/errorHandler";
import { Location, LocationJSON } from "../../lib/server/Location";
import MetOfficeAPI from "../../lib/server/MetOfficeAPI";

const { serverRuntimeConfig } = getConfig();

export default handleErrors(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("Forecasts requested");

	const locations = await MetOfficeAPI.getLocations();

	const filterKeys = Object.keys(req.query).filter((filterKey) =>
		Location.hasProperty(filterKey)
	) as (keyof LocationJSON)[];

	const filteredLocations = locations.filter((location) =>
		filterKeys.every(
			(filterKey) => req.query[filterKey] === location[filterKey]
		)
	);

	if (filteredLocations.length > serverRuntimeConfig.locationLimit) {
		return res.status(400).json({
			message:
				"Too many locations matching parameters. Please be more specific.",
		});
	}

	const forecasts = filteredLocations.map(async (location) => {
		const forecastData = await MetOfficeAPI.getLocationForecast(location);

		const dataPoints = forecastData.periods
			.map((period) => period.dataPoints.map((dataPoint) => dataPoint.toJSON()))
			.flat();

		return {
			id: location.id,
			name: location.name,
			area: location.area,
			forecast: dataPoints,
		};
	});

	res.status(200).json(await Promise.all(forecasts));
});
