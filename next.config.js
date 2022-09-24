module.exports = () => {
    const serviceUrl =
        process.env.NEXT_PUBLIC_SERVICE_URL || 'http://localhost:4001';

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
