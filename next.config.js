/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Transpile Three.js
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}
module.exports = nextConfig
