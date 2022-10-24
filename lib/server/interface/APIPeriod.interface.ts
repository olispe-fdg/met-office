import { APIRep } from "./APIRep.interface";

export interface APIPeriod {
	type: "Day";
	value: string;
	Rep: APIRep[];
}
