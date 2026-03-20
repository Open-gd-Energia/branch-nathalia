import { ListScreenHeader } from "../../_components/list-screen/header";
import { ListLayout } from "../../_components/list-screen/layout";
import { ContactsList } from "./_components/contacts-list";
import { HeaderItems } from "./_components/header-items";
import { fetchContacts } from "./_services/fetch";

export default async function ContatosLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const contactsList = await fetchContacts();
	return (
		<>
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<ContactsList data={contactsList} />
			</ListLayout>
			{children}
		</>
	);
}
