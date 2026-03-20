import { ListScreenHeader } from "../_components/list-screen/header";
import { ListLayout } from "../_components/list-screen/list-layout";
import { Header } from "./_components/header";
import { HeaderItems } from "./_components/header-items";
import { InvoicesList } from "./_components/invoices-list";
import { fetchInvoices } from "./_services/fetch";

export default async function PeopleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const invoicesList = await fetchInvoices();

	return (
		<main className="w-full h-full overflow-hidden">
			<Header />
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<InvoicesList data={invoicesList} />
			</ListLayout>
			{children}
		</main>
	);
}
