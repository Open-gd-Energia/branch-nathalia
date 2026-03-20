import { getServerSession } from "next-auth";
import { fetchConsumerById } from "@/app/(core)/consumidores/_services/fetch-by-id";
import { fetchUser } from "@/app/auth/_services/user";
import { authOptions } from "@/lib/auth/auth-options";
import { DocumentsFetcher } from "./_components/documents-fetcher";

export default async function ConsumerDocumentsPage() {
	const session = await getServerSession(authOptions);
	const user = await fetchUser(session?.user?.id || "");
	const consumer = await fetchConsumerById(user?.consumidores?.[0]?.id || "");

	if (!consumer) return <p>Consumidor não encontrado</p>;

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Documentos</h1>
			<DocumentsFetcher consumer={consumer} />
		</div>
	);
}
