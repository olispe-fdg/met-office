/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        metOfficeApiKey: process.env.MET_OFFICE_API_KEY,
        locationLimit: 10,
    },
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = nextConfig;
