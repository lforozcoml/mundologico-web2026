import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mundologico.com" }],
        destination: "https://mundologico.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
