/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_IMGBB_API_KEY: process.env.NEXT_IMGBB_API_KEY,
    },
    reactStrictMode: false,
    images: {
        domains: [
            "i.ibb.co.com",
            "localhost",
            "192.168.1.5",
            "127.0.0.1",
            "i.ibb.co",
        ],
    },
};

export default nextConfig;