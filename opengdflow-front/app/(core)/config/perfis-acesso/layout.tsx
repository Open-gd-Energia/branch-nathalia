import { ListScreenHeader } from "../../_components/list-screen/header";
import { ListLayout } from "../../_components/list-screen/layout";
import { AccessProfilesList } from "./_components/access-profiles-list";
import { HeaderItems } from "./_components/header-items";
import { fetchAccessProfiles } from "./_services/fetch";

export default async function AccessProfilesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const data = await fetchAccessProfiles();
	return (
		<>
			<ListLayout>
				<ListScreenHeader>
					<HeaderItems />
				</ListScreenHeader>
				<AccessProfilesList data={data} />
			</ListLayout>
			{children}
		</>
	);
}
