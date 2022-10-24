/** @type {import('next').NextConfig} */
const nextConfig = {
	serverRuntimeConfig: {
		metOfficeApiKey: process.env.MET_OFFICE_API_KEY,
	},
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = nextConfig;
