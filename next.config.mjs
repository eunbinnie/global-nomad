/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
