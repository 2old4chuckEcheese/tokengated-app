// next.config.js

// 1. Import and configure next-pwa
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

// 2. Define your Next.js config object
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      `${process.env.CLOUDINARY_CLOUD_NAME}.res.cloudinary.com`,
      "img.youtube.com",
      "pbs.twimg.com",
    ],
  },
};

// 3. Wrap and export withPWA
module.exports = withPWA(nextConfig);
