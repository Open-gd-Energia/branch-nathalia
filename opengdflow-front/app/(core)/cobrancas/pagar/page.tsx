import type { PageProps } from "@/lib/common-types";
import { ListScreenHeader } from "../../_components/list-screen/header";
import { ListLayout } from "../../_components/list-screen/layout";
import { fetchCobranca } from "../_services/fetch";
import { CobrancasList } from "./_components/cobrancas-list";
import { HeaderItems } from "./_components/header-items";

export default async function CobrancasPagarPage({ searchParams }: PageProps) {
	const searchString = (await searchParams)?.search ?? undefined;
	const cobrancasList = await fetchCobranca({
		tipo: "PAGAR",
		identificador: searchString as string | undefined,
	});

	return (
		<ListLayout>
			<ListScreenHeader>
				<HeaderItems />
			</ListScreenHeader>
			<CobrancasList data={cobrancasList} />
		</ListLayout>
	);
}
