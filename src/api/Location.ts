import { APILocation } from "./APILocation.interface";

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
        return `[${this.id}] ${this.name} - ${
            this.area ? this.area : "No area"
        }`;
    }
}
