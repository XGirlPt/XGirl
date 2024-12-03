/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';  // Mantenha o import do 'path'

// Função para obter o diretório atual com import.meta.url
const getDirname = (url) => {
  const fileURL = new URL(url);
  return path.dirname(fileURL.pathname);
};

const nextConfig = {
  images: {
    domains: ['ulcggrutwonkxbiuigdu.supabase.co'], // Define domínios permitidos para carregar imagens
  },

  webpack(config) {
    // Adiciona suporte para arquivos SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Configura o alias @ para apontar para a pasta src
    config.resolve.alias['@'] = path.join(getDirname(import.meta.url), 'src'); // Substitua __dirname por getDirname

    return config;
  },
};

// Configuração do Bundle Analyzer
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Ativa a análise se a variável ANALYZE for true
});

export default bundleAnalyzer(nextConfig);
