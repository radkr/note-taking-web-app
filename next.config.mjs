/** @type {import('next').NextConfig} */
const nextConfig = {
  /*async redirects() {
    return [
      {
        source: "/",
        destination: "/notes",
        permanent: true, // Set to false for a temporary redirect
      },
    ];
  },*/
  async rewrites() {
    return [
      { source: "/notes", destination: "/dashboard/notes" },
      { source: "/settings", destination: "/dashboard/settings" },
      { source: "/notes/:slug*", destination: "/dashboard/notes/:slug*" },
    ];
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
