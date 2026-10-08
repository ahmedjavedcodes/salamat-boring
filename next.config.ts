import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Tailwind v4 is compiled by its Turbopack loader rather than PostCSS.
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  // app/global-not-found.tsx: a 404 shell for paths outside /[lang], which cannot
  // reach the locale layout and therefore have no <html> of their own.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
