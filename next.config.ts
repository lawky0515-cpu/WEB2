import type { NextConfig } from 'next';
const basePath = process.env.BASE_PATH || '';
const config: NextConfig = { output: 'export', basePath, assetPrefix: basePath ? `${basePath}/` : undefined, images: { unoptimized: true }, poweredByHeader: false };
export default config;
