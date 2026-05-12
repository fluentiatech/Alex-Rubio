/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Alex-Rubio',
  assetPrefix: '/Alex-Rubio',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/Alex-Rubio',
  },
}

module.exports = nextConfig
