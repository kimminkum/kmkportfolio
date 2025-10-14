import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        // 필요하면 경로 제한도 가능: pathname: '/**'
      },
    ],
  },
};

export default nextConfig;
