/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: __dirname,
  webpack: (config, { dev }) => {
    if (dev) {
      // Windows + some AV tools can cause filesystem cache rename/ENOENT issues under `.next/cache`.
      // Disabling webpack persistent caching in dev makes local dev more reliable.
      config.cache = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

module.exports = nextConfig;
