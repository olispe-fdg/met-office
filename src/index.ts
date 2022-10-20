import { exit } from "process";
import * as dotenv from "dotenv";
import { MetOfficeAPI } from "./api/MetOfficeAPI";
import { commandLineInterface } from "./cli";

dotenv.config();

async function main() {
    const token = process.env.API_TOKEN;
    if (!token) {
        console.log("API_TOKEN is not set");
        exit(1);
    }

    const api = new MetOfficeAPI(token);
    const locations = await api.getLocations();

    commandLineInterface(locations);
}

main();
