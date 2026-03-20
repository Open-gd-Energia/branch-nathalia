import { ListScreenHeader } from "../../_components/list-screen/header";
import { ListLayout } from "../../_components/list-screen/list-layout";
import { HeaderItems } from "./_components/header-items";
import { InternalUsersList } from "./_components/internal-users-list";
import { fetchInternalUsers } from "./_services/fetch";

export default async function InternalUsersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const distribuitorsList = await fetchInternalUsers();

	return (
		<>
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<InternalUsersList data={distribuitorsList} />
			</ListLayout>
			{children}
		</>
	);
}
