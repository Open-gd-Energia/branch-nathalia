import { withAuth } from "next-auth/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { pathMatchesPattern, protectedRoutesMap } from "@/lib/routes-mapping";

export default withAuth(
	(req: NextRequest) => {
		// biome-ignore lint/suspicious/noExplicitAny: NextAuth injection
		const token = (req as any)?.nextauth?.token;
		const path = req.nextUrl.pathname;

		// If is logged in and is on the sign in page, redirect to /
		if (token && path.startsWith("/auth")) {
			const url = req.nextUrl.clone();
			url.pathname = "/";
			return NextResponse.redirect(url);
		}

		// 1) collect every scope whose patterns match this path
		const requiredScopes: string[] = [];
		for (const [scope, patterns] of Object.entries(protectedRoutesMap)) {
			if (patterns.some((pattern) => pathMatchesPattern(path, pattern))) {
				requiredScopes.push(scope);
			}
		}

		// 2) public route if no scopes protect it
		if (requiredScopes.length === 0) {
			return NextResponse.next();
		}

		// FIXME: Not signed in just nexts to the page
		// 3) not signed in → redirect to sign in
		if (!token) {
			const url = req.nextUrl.clone();
			url.pathname = "/auth/signin";
			url.searchParams.set("callbackUrl", path);
			return NextResponse.redirect(url);
		}

		// 3a) admins skip **all** other checks:
		if (token.scope?.includes("ADMIN")) {
			return NextResponse.next();
		}

		// 4) allow if the user has *any* of the required scopes
		const hasAny = requiredScopes.some((s) => token.scope?.includes(s));
		if (!hasAny) {
			return NextResponse.redirect(new URL("/forbidden", req.url));
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			// We’re handling redirects ourselves now,
			// so always “authorize” so that the first fn runs:
			authorized: () => true,
		},
	},
);

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)",
	],
};
