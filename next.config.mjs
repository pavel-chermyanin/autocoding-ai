/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/proxy/:path*', // Локальный путь
        destination: 'http://172.16.0.219:8000/:path*', // Целевой сервер
      },
    ];
  },
};

export default nextConfig;
