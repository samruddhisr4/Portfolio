/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true, // For image sequences, we might prefer direct canvas loading
    },
};

export default nextConfig;
