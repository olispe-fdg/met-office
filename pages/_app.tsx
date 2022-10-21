import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
	interface Palette {
		rain: {
			20: string;
			50: string;
			80: string;
		};
		temperature: {
			10: string;
			15: string;
			25: string;
		};
		uv: {
			0: string;
			5: string;
			11: string;
		};
	}
}

const theme = extendTheme({
	colorSchemes: {
		light: {
			palette: {
				rain: {
					20: "lightblue",
					50: "cyan",
					80: "darkblue",
				},
				temperature: {
					10: "blue",
					15: "yellow",
					25: "red",
				},
				uv: {
					0: "green",
					5: "red",
					11: "purple",
				},
			},
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Met Office</title>
				<meta
					name="description"
					content="Weather widget using the Met Office DataPoint API with a focus on rain"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CssVarsProvider theme={theme}>
				<Component {...pageProps} />
			</CssVarsProvider>
		</>
	);
}

export default MyApp;
