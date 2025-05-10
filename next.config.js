const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
module.exports = withPWA({
  /** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.CLOUDINARY_CLOUD_NAME + ".res.cloudinary.com",
      "img.youtube.com",
      "pbs.twimg.com"
    ]
  }
};
});
