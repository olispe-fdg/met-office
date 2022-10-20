import { exit } from "process";
import * as dotenv from "dotenv";
import api from "./api/MetOfficeAPI";
import { commandLineInterface } from "./cli";
import { Server } from "./Server";

dotenv.config();

async function main() {
    const token = process.env.API_TOKEN;
    if (!token) {
        console.log("API_TOKEN is not set");
        exit(1);
    }

    api.configure(token);

    const locations = await api.getLocations();

	const server = new Server();
	server.start(8080);

    //await commandLineInterface(locations);
}

main();
