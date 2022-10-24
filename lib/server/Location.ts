import { APILocation } from "./interface";

export class Location {
	id: string;
	name: string;
	area?: string;

	latitude: number;
	longitude: number;

	constructor({ id, name, unitaryAuthArea, latitude, longitude }: APILocation) {
		this.id = id;
		this.name = name;
		this.area = unitaryAuthArea;

		this.latitude = parseFloat(latitude);
		this.longitude = parseFloat(longitude);
	}

	toString() {
		return `[${this.id}] ${this.name} - ${this.area ? this.area : "No area"}`;
	}
}
