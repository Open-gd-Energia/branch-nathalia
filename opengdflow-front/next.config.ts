import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Ignora ESLint no build — evita falha no Vercel por warnings/erros de lint
	eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
