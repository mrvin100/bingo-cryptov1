/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    onDemandEntries: {
        // Désactive le Fast Refresh
        maxInactiveAge: 25 * 1000, // Temps en ms
        pagesBufferLength: 5,
      },
};

export default nextConfig;
