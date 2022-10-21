import React from "react";
import { APIDataPoint, APILocation } from "../lib/client/interface";
import { Dial } from "./Dial";
import styles from "./Dashboard.module.css";
import { UmbrellaFill, ThermometerHalf } from "react-bootstrap-icons";

const weatherTypes: { [key: string]: string } = {
	NA: "not available",
	"0": "clear",
	"1": "sunny",
	"2": "partly cloudy",
	"3": "partly cloudy",
	"4": "not used (probably just want it to be not available too)",
	"5": "mist",
	"6": "fog",
	"7": "cloudy",
	"8": "overcast",
	"9": "light rain",
	"10": "light rain",
	"12": "light rain",
	"11": "drizzle",
	"13": "heavy rain",
	"14": "heavy rain",
	"15": "heavy rain",
	"16": "sleet showers",
	"17": "heavy rain",
	"18": "heavy rain",
	"19": "hail",
	"20": "hail",
	"21": "hail",
	"22": "light snow",
	"23": "light snow",
	"24": "light snow",
	"25": "heavy snow",
	"26": "heavy snow",
	"27": "heavy snow",
	"28": "thunder",
};

const Dashboard: React.FC<{
	location: APILocation;
	dataPoint: APIDataPoint;
}> = ({ location, dataPoint }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>{location.area || location.name}</h1>
			<div>
				<Dial
					amount={dataPoint.data.precipitationProb}
					min={0}
					max={100}
					size={18}
				>
					<UmbrellaFill size={128} />
				</Dial>
			</div>
			<div className={styles.secondaryContainer}>
				<Dial amount={dataPoint.data.temperature} min={-5} max={50} size={8}>
					<ThermometerHalf size={48} />
				</Dial>
				<p>{weatherTypes[dataPoint.data.weatherType]}</p>
				<Dial
					amount={dataPoint.data.maxUVIndex}
					label="UV"
					min={0}
					max={11}
					size={8}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
