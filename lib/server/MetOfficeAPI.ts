import { Location } from "./Location";
import { APIError } from "./APIError";
import { Forecast } from "./Forecast";
import { APILocation } from "./interface/";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

enum RequestType {
	Forecast = "wxfcs",
	Observation = "wxobs",
}

class MetOfficeAPI {
	private token: string;

	constructor() {
		if (!serverRuntimeConfig.metOfficeApiKey) {
			throw new Error("No API key in .env");
		}

		this.token = serverRuntimeConfig.metOfficeApiKey;
	}

	private async request(
		type: RequestType,
		endpoint: string,
		querystring: string = ""
	) {
		if (!this.token) {
			throw new Error("API token missing");
		}

		const response = await fetch(
			`http://datapoint.metoffice.gov.uk/public/data/val/${type}/all/json/${endpoint}?key=${this.token}${querystring}`
		);

		if (!response.ok) {
			throw new APIError(response.statusText, response.status);
		}

		return await response.json();
	}

	async getLocations(): Promise<Location[]> {
		const sitelist = await this.request(RequestType.Forecast, "sitelist");
		return sitelist.Locations.Location.map(
			(location: APILocation) => new Location(location)
		);
	}

	async getLocationFromId(id: string): Promise<Location> {
		const locations = await this.getLocations();
		const matches = locations.filter((location) => location.id === id);

		if (matches.length < 1) {
			throw new APIError("No location with that ID exists", 404);
		}

		if (matches.length > 1) {
			throw new APIError("Duplicate IDs returned by the Met Office API", 500);
		}

		return matches[0];
	}

	async getLocationForecast(location: Location): Promise<Forecast> {
		const data = await this.request(
			RequestType.Forecast,
			location.id,
			"&res=3hourly"
		);

		return new Forecast(data.SiteRep);
	}
}

export default new MetOfficeAPI();
