/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pic2.zhimg.com"],
  },
};

module.exports = nextConfig;
