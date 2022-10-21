import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import { handleErrors } from "lib/server/errorHandler";
import { Location, LocationJSON } from "lib/server/Location";
import MetOfficeAPI from "lib/server/MetOfficeAPI";

const { serverRuntimeConfig } = getConfig();

export default handleErrors(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("Latest forecast requested");
	res.setHeader("Cache-Control", "no-cache");

	// From testing it's not possible to create an array of strings for the query param
	// when it's captured from the route itself
	const id = req.query.id as string;

	const location = await MetOfficeAPI.getLocationFromId(id);
	const forecast = await MetOfficeAPI.getLocationForecast(location);

	res.status(200).json({
		id: location.id,
		name: location.name,
		area: location.area,
		forecast: forecast.getNextDataPoint().toJSON(),
	});
});
