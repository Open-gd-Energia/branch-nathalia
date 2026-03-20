import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getPathBasedOnScope } from "@/lib/utils";

export default async function PerfilDadosPage() {
	const session = await getServerSession(authOptions);

	// not signed in
	if (!session) redirect("/auth/signin");

	// logged and has the scope DADOS
	if (session?.user?.scope.includes("DADOS")) {
		return redirect(
			`/perfil/${session?.user?.perfil?.tipo?.toLocaleLowerCase()}`,
		);
	}

	// is logged and has a scope different from DADOS
	const path = getPathBasedOnScope(session);
	return redirect(path);
}
