import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images with modern formats
    images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Reduce JavaScript bundle size
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Turbopack configuration (required for Next.js 16+)
  turbopack: {
    // Turbopack handles optimization automatically
  },
};

export default nextConfig;
