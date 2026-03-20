import { ListScreenHeader } from "../../_components/list-screen/header";
import { ListLayout } from "../../_components/list-screen/list-layout";
import { DistribuitorsList } from "./_components/distribuitors-list";
import { HeaderItems } from "./_components/header-items";
import { fetchDistribuitors } from "./_services/fetch";

export default async function DistribuitorsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const distribuitorsList = await fetchDistribuitors();
	return (
		<>
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<DistribuitorsList data={distribuitorsList} />
			</ListLayout>
			{children}
		</>
	);
}
