/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "pic2.zhimg.com",
      "i0.hdslb.com",
      "lh3.googleusercontent.com",
      "i2.hdslb.com",
    ],
  },
};

module.exports = nextConfig;
