/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongodb'],
  
  // Image optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Reduce bundle size
  compress: true,
  
  // Memory optimization for low-memory environments
  swcMinify: true,
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'swiper'],
    // Reduce memory usage during builds
    memoryBasedWorkersCount: true,
  },
};

export default nextConfig;
