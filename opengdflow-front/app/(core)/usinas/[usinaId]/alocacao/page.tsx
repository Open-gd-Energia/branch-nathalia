import type { PageProps } from "@/lib/types/shared";
import { fetchUsinaById } from "../../_services/fetch-by-id";
import { UsinaAlocacaoList } from "./_components/alocacao-list";
import { ListHeader } from "./_components/list-header";

export default async function UsinaAlocacaoPage({
	params,
}: PageProps<{ usinaId: string }>) {
	const parameters = await params;
	const usina = await fetchUsinaById(parameters?.usinaId || "");

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Alocação</h1>
			<div className="flex gap-2 px-5 py-2 items-center w-full">
				<ListHeader />
			</div>
			<div className="h-full">
				<UsinaAlocacaoList usina={usina} />
			</div>
		</div>
	);
}
