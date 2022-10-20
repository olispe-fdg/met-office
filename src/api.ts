enum RequestType {
	Forecast = "wxfcs",
	Observation = "wxobs"
};

interface APILocation {
	id: string;
	name: string;

	region: string;
	unitaryAuthArea?: string;

	elevation: string;
	latitude: string;
	longitude: string;
}

export class Location {
	id: string;
	name: string;
	area?: string;

	constructor({ id, name, unitaryAuthArea }: APILocation) {
		this.id = id;
		this.name = name;
		this.area = unitaryAuthArea;
	}

	toString() {
		return `[${this.id}] ${this.name} - ${this.area ? this.area : "No area"}`;
	}
}

export class MetOfficeAPI {
	token: string;

	constructor(token: string) {
		this.token = token;
	}

	private async request(type: RequestType, endpoint: string, querystring: string = "") {
		try {
			const response = await fetch(`http://datapoint.metoffice.gov.uk/public/data/val/${type}/all/json/${endpoint}?key=${this.token}${querystring}`);
			return await response.json();
		} catch (err) {
			console.error(err);
		}
	}

	async getLocations(): Promise<Location[]> {
		const sitelist = await this.request(RequestType.Forecast, "sitelist");
		return sitelist.Locations.Location.map((location: APILocation) => new Location(location));
	}
}
