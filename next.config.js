module.exports = () => {
    const serviceUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:4001'
            : 'https://70hlodrz9c.execute-api.us-east-1.amazonaws.com';

    console.log('>>>>>>>> serviceUrl =', serviceUrl);

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
