export interface APIDataPoint {
	date: string;
	data: {
		feelsLike: string;
		windGust: string;
		relativeHumidity: string;
		temperature: string;
		visibility: string;
		windDirection: string;
		windSpeed: string;
		maxUVIndex: string;
		weatherType: string;
		precipitationProb: string;
	};
}
