import { ListScreenHeader } from "../../_components/list-screen/header";
import { ListLayout } from "../../_components/list-screen/layout";
import { DisctounTypesList } from "./_components/discount-types-list";
import { HeaderItems } from "./_components/header-items";
import { fetchDiscountTypes } from "./_services/fetch";

export default async function DiscountTypesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const discountTypesList = await fetchDiscountTypes();

	return (
		<>
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<DisctounTypesList data={discountTypesList} />
			</ListLayout>
			{children}
		</>
	);
}
