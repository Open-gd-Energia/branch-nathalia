import type { PageProps } from "@/lib/types/shared";
import { fetchUsinaById } from "../../_services/fetch-by-id";
import { ListHeader } from "./_components/list-header";
import { UsinaOrdensPagamentoList } from "./_components/ordens-pagamento-list";

export default async function UsinaOrdensPagamentoPage({
	params,
}: PageProps<{ usinaId: string }>) {
	const parameters = await params;
	const usina = await fetchUsinaById(parameters?.usinaId || "");

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">
				Ordens de pagamento
			</h1>
			<div className="flex gap-2 px-5 py-2 items-center w-fit">
				<ListHeader usina={usina} />
			</div>
			<section className="h-full">
				<UsinaOrdensPagamentoList usina={usina} />
			</section>
		</div>
	);
}
