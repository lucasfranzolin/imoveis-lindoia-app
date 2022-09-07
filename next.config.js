module.exports = () => {
    const serviceUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:4001'
            : process.env.NEXT_PUBLIC_SERVICE_URL;

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
