"use server";

import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./auth/auth-options";

export async function getAccessToken(): Promise<string | undefined> {
	if (typeof window !== "undefined") {
		// ✅ Client-side
		const session = await getSession();
		return session?.user?.accessToken;
	}

	// ✅ Server-side (App Router)
	const session = await getServerSession(authOptions);
	return session?.user?.accessToken;
}
