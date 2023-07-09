/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //unoptimized: true,
        deviceSizes: [320, 640, 1024, 1280, 1920],
        domains: [
            'lh2.googleusercontent.com',
            'lh3.googleusercontent.com',
            'lh4.googleusercontent.com',
            'lh5.googleusercontent.com',
            'lh6.googleusercontent.com',
            'lh7.googleusercontent.com',
        ],
    },
};

module.exports = nextConfig;
