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

	console.log(req.query);

	res.status(200).send("");
});
