import type { PageProps } from "@/lib/types/shared";
import { fetchConsumerById } from "../../_services/fetch-by-id";
import { ConsumidorFaturasList } from "./_components/faturas-list";
import { ListHeader } from "./_components/list-header";

export default async function ConsumerFaturaPage({
	params,
}: PageProps<{ consumerId: string }>) {
	const parameters = await params;
	const consumer = await fetchConsumerById(parameters?.consumerId || "");

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Faturas</h1>
			<div className="flex gap-2 px-5 py-2 items-center w-fit">
				<ListHeader />
			</div>
			<section className="h-full">
				<ConsumidorFaturasList consumer={consumer} />
			</section>
		</div>
	);
}
