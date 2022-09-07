/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pic2.zhimg.com", "i0.hdslb.com"],
  },
};

module.exports = nextConfig;
