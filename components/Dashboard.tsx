import React from "react";
import { APIDataPoint, APILocation } from "../lib/client/interface";
import { Dial } from "./Dial";
import styles from "./Dashboard.module.css";
import { UmbrellaFill, ThermometerHalf } from "react-bootstrap-icons";

const Dashboard: React.FC<{
	location: APILocation;
	dataPoint: APIDataPoint;
}> = ({ location, dataPoint }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>{location.area || location.name}</h1>
			<div>
				<Dial amount={dataPoint.data.precipitationProb} size={18}>
					<UmbrellaFill size={128} />
				</Dial>
			</div>
			<div className={styles.secondaryContainer}>
				<Dial amount={dataPoint.data.temperature} size={8}>
					<ThermometerHalf size={48} />
				</Dial>
				<p>{dataPoint.data.weatherType}</p>
				<Dial amount={dataPoint.data.maxUVIndex} label="UV" size={8} />
			</div>
		</div>
	);
};

export default Dashboard;
