import { NextApiRequest, NextApiResponse } from "next";
import { APIError } from "./APIError";

type AsyncRequestHandler = (
	req: NextApiRequest,
	res: NextApiResponse
) => Promise<void>;

export function handleErrors(
	requestHandler: AsyncRequestHandler
): AsyncRequestHandler {
	return async (request, response) => {
		try {
			console.log("Processing request");
			await requestHandler(request, response);
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: "Error instance was of unknown type";
			const status = err instanceof APIError ? err.statusCode : 500;

			response.statusMessage = message;
			response.status(status).send("");
		}
	};
}
