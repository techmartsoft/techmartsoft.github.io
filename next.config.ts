import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Generates static HTML in the 'out' folder
  basePath: "", // Replace with your GitHub repo name
  images: {
    unoptimized: true, // Required because GitHub Pages has no image server
  },
  trailingSlash: true, // Helps avoid 404s on subpages
};
export default nextConfig;
