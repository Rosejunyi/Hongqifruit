import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用静态导出 (用于 Netlify 部署)
  output: 'export',

  // 禁用尾部斜杠 (避免路由问题)
  trailingSlash: false,

  // 禁用图片优化 (静态导出不支持)
  images: {
    unoptimized: true
  },

  // 确保正确的资源路径
  assetPrefix: '',

  /* App Router 使用不同的国际化方式 */
  experimental: {
    // 为未来的功能预留
  },
};

export default nextConfig;
