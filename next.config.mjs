// next.config.mjs
const nextConfig = {
  distDir: "out",
  trailingSlash: true,
  output: "export", // Add this line
  images: {
    unoptimized: true,
  },
  // other configurations...
};

export default nextConfig;
