/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  eslint: {
    dirs: ['pages', 'shared'],
  },
  images: {
    domains: ['171.244.51.190', '171.244.51.26', '172.16.15.12'],
  },
  output: "standalone"
};

module.exports = nextConfig;
