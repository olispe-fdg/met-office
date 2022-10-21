import { haversineDistance, Position } from "lib/client/haversineDistance";
import { APILocation, APIDataPoint } from "lib/client/interface";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const [position, setPosition] = useState<Position>();
	const [location, setLocation] = useState<APILocation>();
	const [dataPoint, setDataPoint] = useState<APIDataPoint>();

	async function getLatestDataPoint() {
		if (!location) return;

		const response = await fetch(`/api/forecast/latest/${location.id}`);

		setDataPoint(await response.json());
	}

	async function getClosestLocation() {
		const response = await fetch("/api/locations");
		const locations = (await response.json()) as APILocation[];

		if (locations.length < 1 || !position) {
			return;
		}

		setLocation(
			locations.reduce((prev, curr) => {
				if (!prev) {
					return curr;
				}

				return haversineDistance(position, curr) <
					haversineDistance(position, prev)
					? curr
					: prev;
			})
		);
	}

	useEffect(() => {
		if (position) return;
		navigator.geolocation.getCurrentPosition((position) => {
			setPosition(position.coords);
		});
	}, []);

	useEffect(() => {
		if (!position) return;
		getClosestLocation();
	}, [position]);

	useEffect(() => {
		if (!location) return;
		getLatestDataPoint();
	}, [location]);

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				{location && dataPoint && (
					<Dashboard location={location} dataPoint={dataPoint} />
				)}
			</main>
		</div>
	);
};

export default Home;
