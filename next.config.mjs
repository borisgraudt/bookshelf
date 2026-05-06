/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  allowedDevOrigins: ['127.52.148.42', 'localhost'],
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber', 'three', 'zustand'],
  },
  turbopack: {
    resolveAlias: {
      'three/examples/jsm': 'three/examples/jsm',
    },
  },
};
