const results = document.getElementById("results");

async function handleLocationInput(e) {
	e.preventDefault();

	const data = new FormData(e.target);

	const locationName = data.get("location");

	const res = await fetch(`forecast?name=${locationName}`);

	const forecasts = await res.json();

	if (forecasts.length < 1) {
		throw Error("No forecasts");
	}

	renderForecastData(forecasts[0]);
}

function renderForecastData(forecast) {
	results.innerHTML = "";
	forecast.forecast.forEach((dataPoint) => renderDataPoint(dataPoint));
}

function renderDataPoint(dataPoint) {
	const container = document.createElement("div");
	container.innerHTML = `
    <h3>Data point</h3>
    <strong>${dataPoint.date}</strong>
    <ul>
        <li>Wind direction: ${dataPoint.data.windDirection}</li>
        <li>Chance of rain: ${dataPoint.data.precipitationProb}</li>
    </ul>
    `;
	results.appendChild(container);
}

document
	.getElementById("input-form")
	.addEventListener("submit", handleLocationInput);
