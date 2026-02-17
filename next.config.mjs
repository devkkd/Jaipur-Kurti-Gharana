/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongodb'],
  
  // Memory optimization for Render free tier
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-hot-toast'],
  },
  
  // Reduce memory usage (swcMinify removed - default in Next.js 16)
  compress: true,
  
  // Image optimization
  images: {
    unoptimized: true, // Disable image optimization to save memory
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Output standalone for better memory management
  output: 'standalone',
  
  // Add empty turbopack config to silence the warning
  turbopack: {},
  
  webpack: (config, { isServer }) => {
    // Optimize memory usage
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        maxSize: 244000, // Split chunks to reduce memory
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 10,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Safe package name extraction
              try {
                const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                if (match && match[1]) {
                  const packageName = match[1].replace('@', '');
                  return `npm.${packageName}`;
                }
                return 'npm.vendor';
              } catch (e) {
                return 'npm.vendor';
              }
            },
            priority: 20,
          },
        },
      },
    };
    
    // Reduce bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;
