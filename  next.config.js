/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer');

const nextConfig = {
  images: {
    domains: ['ulcggrutwonkxbiuigdu.supabase.co'],
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'), // Ou o caminho correto para o seu diretório
    };
    return config;
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = bundleAnalyzer(nextConfig);
