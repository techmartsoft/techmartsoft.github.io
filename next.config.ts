import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Outputs static HTML/CSS/JS to an 'out' folder
  images: {
    unoptimized: true, // Required because GitHub Pages doesn't have an image optimization server
  },
};
export default nextConfig;
