import { APILocation } from "./interface";

export interface LocationJSON {
    id: string;
    name: string;
    area?: string;
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

    static hasProperty(key: string) {
        return ["id", "name", "area"].includes(key);
    }

    toString() {
        return `[${this.id}] ${this.name} - ${
            this.area ? this.area : "No area"
        }`;
    }
}
