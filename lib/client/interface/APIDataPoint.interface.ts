export interface APIDataPoint {
	date: string;
	data: {
		feelsLike: number;
		windGust: number;
		relativeHumidity: number;
		temperature: number;
		visibility: string;
		windDirection: string;
		windSpeed: number;
		maxUVIndex: number;
		weatherType: string;
		precipitationProb: number;
	};
}
