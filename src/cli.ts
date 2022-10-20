import readlineSync from "readline-sync";
import { Location } from "./api/Location";
import MetOfficeAPI from "./api/MetOfficeAPI";

function getString(prompt: string) {
    const input = readlineSync.question(prompt);
    return input.toLowerCase();
}

function getLocationsFromUser(locations: Location[]) {
    const userInputLocation = getString("Enter location name: ");
    return locations.filter(
        (location) => location.name.toLowerCase() === userInputLocation
    );
}

function chooseLocationFromMatches(locations: Location[]): Location {
    console.log("Multiple locations found!");

    locations.forEach((location) => {
        console.log(location.toString());
    });

    const id = getString("Enter ID: ");

    const match = locations.find((location) => location.id === id);

    if (!match) {
        return chooseLocationFromMatches(locations);
    }

    return match;
}

async function handleUserLocation(location: Location) {
    const forecast = await MetOfficeAPI.getLocationForecast(location);
    const nextRep = forecast.getNextDataPoint();
    console.log(nextRep.toString());
}

export async function commandLineInterface(locations: Location[]) {
    const matches = getLocationsFromUser(locations);

    if (matches.length === 0) {
        console.log("No location found!");
        return;
    }

    if (matches.length > 1) {
        const match = chooseLocationFromMatches(matches);
        return await handleUserLocation(match);
    }

    return await handleUserLocation(matches[0]);
}
