import { haversineDistance, Position } from "lib/client/haversineDistance";
import { APILocation } from "lib/client/interface";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const [position, setPosition] = useState<Position>({
		latitude: 0,
		longitude: 0,
	});

	const [location, setLocation] = useState<APILocation>();

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
		navigator.geolocation.getCurrentPosition((position) => {
			setPosition(position.coords);
		});

		getClosestLocation();
	}, []);

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
				{location && (
					<div>
						<span>Name: {location.area}</span>
						<span>
							Latlong: {location.latitude}, {location.longitude}
						</span>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
