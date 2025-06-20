const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the experimental outputFileTracingRoot that might be causing issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;