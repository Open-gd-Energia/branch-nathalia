import { NextResponse } from "next/server";

/**
 * Rota de diagnóstico: testa se o front consegue alcançar o backend.
 * Acesse: /api/health-backend
 * Útil para debug quando o login não funciona no Vercel.
 */
export async function GET() {
	const baseUrl =
		process.env.API_URL_SERVER ?? process.env.NEXT_PUBLIC_API_URL ?? "";

	if (!baseUrl) {
		return NextResponse.json(
			{
				ok: false,
				error: "NEXT_PUBLIC_API_URL não configurada",
				env: {
					NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ? "(definida)" : "(não definida)",
					API_URL_SERVER: process.env.API_URL_SERVER ? "(definida)" : "(não definida)",
				},
			},
			{ status: 500 },
		);
	}

	try {
		const url = `${baseUrl.replace(/\/$/, "")}/auth/login`;
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: "teste@teste.com", senha: "teste" }),
		});

		// 401 = backend respondeu (credenciais erradas, mas a conexão funcionou)
		const statusOk = res.status === 401 || res.status === 200;
		return NextResponse.json({
			ok: statusOk,
			backendReachable: statusOk,
			backendUrl: baseUrl,
			status: res.status,
			message:
				res.status === 401
					? "Backend alcançável (401 = credenciais inválidas, esperado neste teste)"
					: res.status === 200
						? "Backend alcançável"
						: `Backend retornou ${res.status}`,
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return NextResponse.json(
			{
				ok: false,
				backendReachable: false,
				backendUrl: baseUrl,
				error: message,
			},
			{ status: 500 },
		);
	}
}
