/** @type { import ('next').nextConfig}  */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/conversations", permanent: true }];
  },
};

export default nextConfig;
