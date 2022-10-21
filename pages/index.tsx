import { haversineDistance } from "lib/client/haversineDistance";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const [position, setPosition] = useState<GeolocationPosition>();

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setPosition(position);
		});
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
				{position !== undefined && (
					<div>
						<span>Latitude: {position.coords.latitude}</span>
						<br />
						<span>Longitude: {position.coords.longitude}</span>
						<br />
						<span>
							Distance to Carlisle Airport:{" "}
							{haversineDistance(position.coords, {
								latitude: 54.9375,
								longitude: -2.8092,
							})}
						</span>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
