import type { PageProps } from "@/lib/common-types";
import { ListScreenHeader } from "../_components/list-screen/header";
import { ListLayout } from "../_components/list-screen/list-layout";
import { HeaderItems } from "./_components/header-items";
import { UpsertUsinaSheet } from "./_components/upsert-usina";
import { UsinasList } from "./_components/usinas-list";
import { fetchUsinas } from "./_services/fetch";

export default async function UsinasPage({ searchParams }: PageProps) {
	const searchString = (await searchParams)?.search ?? undefined;
	const usinasList = await fetchUsinas(searchString as string | undefined);

	return (
		<ListLayout>
			<ListScreenHeader>
				<HeaderItems />
			</ListScreenHeader>
			<UsinasList data={usinasList} />

			<UpsertUsinaSheet />
		</ListLayout>
	);
}
