/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Enable server components by default
  experimental: {
    serverComponents: true,
  },
  // Configure image domains if needed
  images: {
    domains: [],
  },
}

export default nextConfig;
