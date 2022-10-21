export interface Position {
	latitude: number;
	longitude: number;
}

const EARTH_RADIUS_KM = 6371;

function degreesToRadians(degrees: number): number {
	return degrees * (Math.PI / 180);
}

export function haversineDistance(
	{ latitude: latA, longitude: longA }: Position,
	{ latitude: latB, longitude: longB }: Position
): number {
	latA = degreesToRadians(latA);
	latB = degreesToRadians(latB);
	longA = degreesToRadians(longA);
	longB = degreesToRadians(longB);

	const deltaLat = latB - latA;
	const deltaLong = longB - longA;

	const a =
		Math.sin(deltaLat / 2) ** 2 +
		Math.cos(latA) * Math.cos(latB) * Math.sin(deltaLong / 2) ** 2;

	return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}
