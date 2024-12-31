/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  onDemandEntries: {
    // Désactive le Fast Refresh
    maxInactiveAge: 25 * 1000, // Temps en ms
    pagesBufferLength: 5,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
