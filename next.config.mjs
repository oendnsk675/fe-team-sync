/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.daisyui.com', 'ui-avatars.com', 'localhost'],
  },
  typescript: {
    ignoreBuildErrors: true, // ⛔ build lanjut walaupun ada TS error
  },
};

export default nextConfig;
