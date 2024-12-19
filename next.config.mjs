/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Existing hostnames
      {
        protocol: 'https',
        hostname: 'd12ryzjapybmlj.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'v2.exercisedb.io',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'd8fdoh4mfxcnk.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd12ryzjapybml.cloudfront.net',
        pathname: '/**',
      },
      // Add the missing hostname
      {
        protocol: 'https',
        hostname: 'doyg075k8m500.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'doyg075k8m500.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img1.kakaocdn.net',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
