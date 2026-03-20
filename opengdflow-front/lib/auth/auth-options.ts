import * as jose from "jose";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/app/auth/_services/login";
import type { FetcherError } from "@/lib/fetcher";
import type { User } from "@/lib/models/user";

// No servidor (ex.: Docker) use API_URL_SERVER para alcançar o backend pela rede interna
const BASE_URL =
	process.env.API_URL_SERVER ?? process.env.NEXT_PUBLIC_API_URL ?? "";

/** Mensagem amigável conforme o tipo de erro na API (login vs outros). */
function getLoginErrorMessage(error: unknown): string {
	// Mensagens já amigáveis lançadas pelo próprio authorize
	const msg = (error as Error)?.message;
	if (
		typeof msg === "string" &&
		(msg.includes("Credenciais inválidas") ||
			msg.includes("Dados do usuário incompletos"))
	) {
		return msg;
	}

	const err = error as FetcherError | undefined;
	const status = err?.status;

	if (status === 401) {
		return "Usuário e/ou senha inválidos. Por favor, tente novamente.";
	}
	if (status === 403) {
		return "Acesso negado. Sua conta pode estar inativa.";
	}
	if (status === 404) {
		return "Serviço de login indisponível. Tente mais tarde.";
	}
	if (status !== undefined && status >= 500) {
		return "Erro no servidor. Tente novamente em alguns minutos.";
	}
	// Erro de rede, timeout ou outro (sem status)
	if (status === undefined || status === 0) {
		return "Erro de conexão. Verifique sua internet e tente novamente.";
	}
	// 400, 422, etc.
	return "Erro ao processar o login. Tente novamente ou contate o suporte.";
}

export const authOptions: AuthOptions = {
	pages: {
		signIn: "/auth/signin",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "E‑mail", type: "text" },
				senha: { label: "Senha", type: "password" },
			},
			async authorize(credentials) {
				try {
					if (!credentials) throw new Error("Credenciais inválidas");
					const data = await login({
						email: credentials.email,
						senha: credentials.senha,
					});

					if (!data?.accessToken) throw new Error("Credenciais inválidas");

					const jwtData = jose.decodeJwt<{ scope: string }>(data.accessToken);

					const res = await fetch(`${BASE_URL}/usuarios/${jwtData.sub}`, {
						headers: {
							Authorization: `Bearer ${data.accessToken}`,
						},
					});

					if (!res.ok) {
						const contentType = res.headers.get("content-type");
						const errorData = contentType?.includes("application/json")
							? await res.json()
							: await res.text();
						throw {
							message: String(errorData?.message ?? errorData),
							status: res.status,
							data: errorData,
						} satisfies FetcherError;
					}

					const user = (await res.json()) as User;

					if (!user.id || !user.nome || !user.email) {
						throw new Error("Dados do usuário incompletos");
					}

					return {
						id: user.id,
						name: user.nome,
						email: user.email,
						image: user.urlFoto ?? null,
						perfil: user?.perfil ?? undefined,
						accessToken: data.accessToken,
						expiresIn: data.expiresIn,
						scope: jwtData?.scope?.split(" ") ?? [],
					};
				} catch (error) {
					console.error("[authorize]", error);
					throw new Error(getLoginErrorMessage(error));
				}
			},
		}),
	],

	session: { strategy: "jwt", maxAge: 6 * 60 * 60 },
	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		// 🔐 first time sign-in: copy everything from `user` → `token`
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken;
				token.expiresIn = user.expiresIn;
				token.scope = user.scope;
				token.id = user.id;
				token.perfil = user.perfil;
				token.name = user.name;
				token.email = user.email;
				token.image = user.image;
			}
			return token;
		},

		// ✨ on every getSession/useSession: copy from `token` → `session`
		async session({ session, token }) {
			session.user = {
				id: token.id,
				name: token.name,
				email: token.email,
				perfil: token.perfil,
				expiresIn: token.expiresIn,
				accessToken: token.accessToken,
				scope: token.scope,
			};
			return session;
		},
	},
};
