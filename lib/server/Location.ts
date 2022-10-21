import { APILocation } from "./interface";

export class Location {
	id: string;
	name: string;
	area?: string;

	latitude: string;
	longitude: string;

	constructor({ id, name, unitaryAuthArea, latitude, longitude }: APILocation) {
		this.id = id;
		this.name = name;
		this.area = unitaryAuthArea;

		this.latitude = latitude;
		this.longitude = longitude;
	}

	toString() {
		return `[${this.id}] ${this.name} - ${this.area ? this.area : "No area"}`;
	}
}
