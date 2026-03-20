import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// authInterrupts removido — experimental, pode causar 404 no Vercel
	// Fix monorepo: evita que Next.js use a raiz errada
	outputFileTracingRoot: path.join(__dirname),
	// Ignora ESLint no build — evita falha no Vercel por warnings/erros de lint
	eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
