import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
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
				<h1>temp</h1>
			</main>
		</div>
	);
};

export default Home;
