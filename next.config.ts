import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Die Bilder liegen bereits als optimiertes WebP vor; AVIF spart bei
    // diesen Motiven nochmals spürbar Gewicht.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
