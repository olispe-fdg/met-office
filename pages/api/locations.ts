import { NextApiRequest, NextApiResponse } from "next";
import { handleErrors } from "lib/server/errorHandler";
import { Location, LocationJSON } from "lib/server/Location";
import MetOfficeAPI from "lib/server/MetOfficeAPI";

export default handleErrors(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("Locations requested");

	const locations = await MetOfficeAPI.getLocations();

	const filterKeys = Object.keys(req.query).filter((filterKey) =>
		Location.hasProperty(filterKey)
	) as (keyof LocationJSON)[];

	const filteredLocations = locations.filter((location) =>
		filterKeys.every(
			(filterKey) => req.query[filterKey] === location[filterKey]
		)
	);

	res.status(200).json(filteredLocations);
});
