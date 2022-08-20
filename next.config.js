/* eslint-disable @typescript-eslint/no-var-requires */
const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const isProd =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';

    console.log(`phase: ${isDev ? 'dev' : isProd ? 'prod' : 'stg'}`);

    const { serviceUrl } = (() => {
        if (isDev)
            return {
                serviceUrl: 'http://localhost:4001',
            };
        if (isProd)
            return {
                serviceUrl: '',
            };
        return {
            serviceUrl:
                'https://70hlodrz9c.execute-api.us-east-1.amazonaws.com/stg',
        };
    })();

    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        reactStrictMode: true,
        swcMinify: true,
        async rewrites() {
            return [
                {
                    source: '/api/:path*',
                    destination: serviceUrl + '/:path*',
                },
            ];
        },
    };

    return nextConfig;
};
