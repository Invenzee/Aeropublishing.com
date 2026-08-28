import type { NextConfig } from "next";

const blogSlugRedirects = [
  "how-to-promote-your-ebook-on-booktok-instagram-linkedin",
  "how-to-become-a-best-selling-author-on-amazon-a-step-by-step-launch-strategy",
  "cheapest-way-to-publish-book",
  "how-to-publish-a-poetry-ebook-on-amazon-kdp-step-by-step-guide",
  "turn-your-blog-into-book",
  "ghostwriting-for-aviation",
  "cost-to-self-publish-novel",
].map((slug) => ({
  source: `/${slug}`,
  destination: `/blog/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/how-to-convert-your-blog-into-an-ebook-make-money-by-selling-it-online",
        destination: "/blog/turn-your-blog-into-book",
        permanent: true,
      },
      {
        source: "/what-is-the-cheapest-way-to-publish-a-book-in-2026-a-smart-authors-budget-guide",
        destination: "/blog/cheapest-way-to-publish-book",
        permanent: true,
      },
      {
        source: "/blog/what-is-the-cheapest-way-to-publish-a-book-in-2026-a-smart-authors-budget-guide",
        destination: "/blog/cheapest-way-to-publish-book",
        permanent: true,
      },
      {
        source: "/how-much-does-it-cost-to-self-publish-a-novel-2026-breakdown",
        destination: "/blog/cost-to-self-publish-novel",
        permanent: true,
      },
      {
        source: "/blog/how-much-does-it-cost-to-self-publish-a-novel-2026-breakdown",
        destination: "/blog/cost-to-self-publish-novel",
        permanent: true,
      },
      ...blogSlugRedirects,
    ];
  },

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
