import { ListScreenHeader } from "../_components/list-screen/header";
import { ListLayout } from "../_components/list-screen/list-layout";
import { AlocacaoList } from "./_components/alocacao-list";
import { Header } from "./_components/header";
import { HeaderItems } from "./_components/header-items";
import { fetchAlocacaoItems } from "./_services/fetch-alocacao-item";

export default async function AlocacaoLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const alocacaoList = await fetchAlocacaoItems();

	return (
		<main className="w-full h-full overflow-hidden">
			<Header />
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<AlocacaoList data={alocacaoList} />
			</ListLayout>
			{children}
		</main>
	);
}
