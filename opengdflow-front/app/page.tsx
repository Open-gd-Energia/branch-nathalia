import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getPathBasedOnScope } from "@/lib/utils";

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (session) {
		const path = getPathBasedOnScope(session);
		return redirect(path);
	}

	redirect("/auth/signin");
}
