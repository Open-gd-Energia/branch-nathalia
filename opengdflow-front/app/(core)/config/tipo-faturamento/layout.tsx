import { ListScreenHeader } from "../../_components/list-screen/header";
import { ListLayout } from "../../_components/list-screen/list-layout";
import { BillingTypeList } from "./_components/billing-type-list";
import { HeaderItems } from "./_components/header-items";
import { fetchBillingType } from "./_services/fetch";

export default async function BillingTypeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const billingTypeList = await fetchBillingType();

	return (
		<>
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<BillingTypeList data={billingTypeList} />
			</ListLayout>
			{children}
		</>
	);
}
