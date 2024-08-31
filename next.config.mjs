/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zq.titan007.com",
        port: "",
        pathname: "/Image/**",
      },
      {
        protocol: "https",
        hostname: "okchoi68.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "integration.banhgio88.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "banhgioo.sgp1.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zq.titan007.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
