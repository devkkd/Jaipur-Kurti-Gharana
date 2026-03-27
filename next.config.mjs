/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongodb'],
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Reduce bundle size
  compress: true,
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'swiper'],
    memoryBasedWorkersCount: true,
  },
};

export default nextConfig;
