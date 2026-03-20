// src/types/next-auth.d.ts
import { type DefaultSession, type DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { Perfil } from "../models/perfil";

declare module "next-auth" {
	/**
	 * Returned by `useSession()`, `getSession()` and `getServerSession()`
	 */
	interface Session extends DefaultSession {
		user: {
			/** The default session properties */
			name?: string | null;
			email?: string | null;
			image?: string | null;
			perfil?: Perfil | null;

			/** Your custom properties */
			accessToken: string;
			expiresIn: number;
			scope: string[];
			id: string;
		};
	}

	/**
	 * The user object you return from `authorize()` in CredentialsProvider
	 */
	interface User extends DefaultUser {
		accessToken: string;
		perfil?: Perfil | null;
		expiresIn: number;
		scope: string[];
		id: string;
	}
}

declare module "next-auth/jwt" {
	/**
	 * The token object that is passed to `jwt()` callback
	 */
	interface JWT extends DefaultJWT {
		accessToken: string;
		expiresIn: number;
		perfil?: Perfil | null;
		scope: string[];
		id: string;
	}
}
