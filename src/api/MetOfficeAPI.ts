import { Location } from "./Location";
import { APIError } from "./APIError";
import { APILocation } from "./APILocation.interface";
import { Forecast } from "./Forecast";

enum RequestType {
    Forecast = "wxfcs",
    Observation = "wxobs",
}

class MetOfficeAPI {
    private token?: string;

    constructor() {}

    configure(token: string) {
        this.token = token;
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

    async getLocationForecast(location: Location) {
        const data = await this.request(
            RequestType.Forecast,
            location.id,
            "&res=3hourly"
        );

        return new Forecast(data.SiteRep);
    }
}

export default new MetOfficeAPI();
