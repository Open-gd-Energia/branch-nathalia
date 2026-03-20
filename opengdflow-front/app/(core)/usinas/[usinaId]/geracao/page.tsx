import type { PageProps } from "@/lib/types/shared";
import { fetchUsinaById } from "../../_services/fetch-by-id";
import { UsinaGeracaoList } from "./_components/geracao-list";
import { ListHeader } from "./_components/list-header";
import { UpsertGeracaoSheet } from "./_components/upsert-geracao";

export default async function UsinaGeracaoPage({
	params,
}: PageProps<{ usinaId: string }>) {
	const parameters = await params;
	const usina = await fetchUsinaById(parameters?.usinaId || "");

	if (!usina) {
		return (
			<div className="flex w-full p-4 items-center justify-center">
				<p className="text-lg font-semibold">Usina nao encontrada</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Geração</h1>
			<div className="flex gap-2 px-5 py-2 items-center w-full">
				<ListHeader usina={usina} />
			</div>
			<section className="h-full">
				<UsinaGeracaoList usina={usina} />
			</section>

			<UpsertGeracaoSheet usina={usina} />
		</div>
	);
}
