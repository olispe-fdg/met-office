import { NextApiRequest, NextApiResponse } from "next";
import { handleErrors } from "lib/server/errorHandler";
import { Location } from "lib/server/Location";
import MetOfficeAPI from "lib/server/MetOfficeAPI";

export default handleErrors(async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("Locations requested");

	const locations = await MetOfficeAPI.getLocations();

	const filterKeys = Object.keys(req.query).filter((filterKey) =>
		["id", "name", "area"].includes(filterKey)
	) as (keyof Location)[];

	const filteredLocations = locations.filter((location) =>
		filterKeys.every(
			(filterKey) => req.query[filterKey] === location[filterKey]
		)
	);

	res.status(200).json(filteredLocations);
});
