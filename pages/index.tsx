import { haversineDistance, Position } from "lib/client/haversineDistance";
import { APILocation, APIDataPoint } from "lib/client/interface";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
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

				if (
					haversineDistance(position, curr) < haversineDistance(position, prev)
				) {
					return curr;
				}

				return prev;
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
			<Head>
				<title>Met Office</title>
				<meta
					name="description"
					content="Weather widget using the Met Office DataPoint API with a focus on rain"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{position && (
					<div>
						<span>
							Latlong: {position.latitude}, {position.longitude}
						</span>
					</div>
				)}
				<br />

				{location && (
					<div>
						<div>Name: {location.name}</div>
						<div>
							Latlong: {location.latitude}, {location.longitude}
						</div>
					</div>
				)}

				<br />

				{dataPoint && (
					<div>
						<div>{dataPoint.date}</div>
						<div>{dataPoint.data.precipitationProb}% Chance of rain</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
