import { ListScreenHeader } from "../../_components/list-screen/header";
import { ListLayout } from "../../_components/list-screen/layout";
import { HeaderItems } from "./_components/header-items";
import { TariffRulesList } from "./_components/tariff-rules-list";
import { fetchTariffRules } from "./_services/fetch";

export default async function RegrasTarifariasLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const tariffRulesList = await fetchTariffRules();

	return (
		<>
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<TariffRulesList data={tariffRulesList} />
			</ListLayout>
			{children}
		</>
	);
}
