import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "www.notion.so" },
    ],
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    qualities: [65, 85],
    // El salto por defecto entre 2048 y 3840 hace que cualquier pantalla
    // retina de tamaño mediano (el lightbox, por ejemplo) pida la variante
    // más grande de golpe. 2560 cubre esa franja intermedia.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
};

export default nextConfig;
