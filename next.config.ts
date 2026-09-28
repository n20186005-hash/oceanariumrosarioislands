import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  // OpenNext/Cloudflare Workers 需要 standalone 产物（.next/standalone），
  // 不能用 output:'export'（静态导出不会生成 .next/standalone，导致部署 ENOENT）。
  output: 'standalone' as const,
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
  // 解决多lockfile警告
  outputFileTracingRoot: process.cwd(),
};

export default withNextIntl(nextConfig);
