/** @type {import('next').NextConfig} */
const nextConfig = {
     eslint: {
    // Esto evita que el build falle por errores de ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
