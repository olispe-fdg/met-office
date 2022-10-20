import { Location } from "./Location";
import { APIError } from "./APIError";
import { APILocation } from "./APILocation.interface";

enum RequestType {
    Forecast = "wxfcs",
    Observation = "wxobs",
}

export class MetOfficeAPI {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async request(
        type: RequestType,
        endpoint: string,
        querystring: string = ""
    ) {
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
}
