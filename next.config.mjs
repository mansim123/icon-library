// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [process.env.IMAGE_DOMAIN], // Use the environment variable here
    },
  };
  
  export default nextConfig;