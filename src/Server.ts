import express, { Express, Request, Response, RequestHandler } from "express";
import api from "./api/MetOfficeAPI";

export class Server {
	app: Express;

	constructor() {
		this.app = express();
		this.app.get("/forecast", this.getForecast);
	}

	start(port: number) {
		this.app.listen(port, () => console.log(`Server started on port ${port}`));
	}

	getForecast: RequestHandler = (request: Request, response: Response) => {
		response.send("Hello world");
	}
}
