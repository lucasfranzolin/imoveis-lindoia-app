/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.SERVICE_URL + '/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
