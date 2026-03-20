import type { PageProps } from "@/lib/common-types";
import { ListScreenHeader } from "../_components/list-screen/header";
import { ListLayout } from "../_components/list-screen/list-layout";
import { ConsumersList } from "./_components/consumers-list";
import { HeaderItems } from "./_components/header-items";
import { UpsertConsumerSheet } from "./_components/upsert-consumer";
import { fetchConsumers } from "./_services/fetch";

export default async function ConsumersPage({ searchParams }: PageProps) {
	const searchString = (await searchParams)?.search ?? undefined;
	const consumersList = await fetchConsumers(
		searchString as string | undefined,
		{ status: "ATIVO" },
	);

	return (
		<ListLayout>
			<ListScreenHeader>
				<HeaderItems />
			</ListScreenHeader>
			<ConsumersList data={consumersList} />

			<UpsertConsumerSheet />
		</ListLayout>
	);
}
