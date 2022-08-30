module.exports = () => {
    const serviceUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:4001'
            : 'https://70hlodrz9c.execute-api.us-east-1.amazonaws.com';

    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        reactStrictMode: false,
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
