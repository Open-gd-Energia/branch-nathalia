import { getServerSession } from "next-auth";
import { fetchUsinaById } from "@/app/(core)/usinas/_services/fetch-by-id";
import { fetchUser } from "@/app/auth/_services/user";
import { authOptions } from "@/lib/auth/auth-options";
import { DocumentsFetcher } from "./_components/documents-fetcher";

export default async function UsinaDocumentsPage() {
	const session = await getServerSession(authOptions);
	const user = await fetchUser(session?.user?.id || "");
	const usina = await fetchUsinaById(user?.usinas?.[0]?.usina?.id || "");

	if (!usina) return <p>Usina não encontrada</p>;

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Documentos</h1>
			<DocumentsFetcher usina={usina} />
		</div>
	);
}
