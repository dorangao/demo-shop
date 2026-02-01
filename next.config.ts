import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize package imports for better bundle size (Vercel best practice)
  experimental: {
    optimizePackageImports: ['zustand'],
  },
  
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
