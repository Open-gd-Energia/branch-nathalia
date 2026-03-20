import { getServerSession } from "next-auth";
import { fetchUsinaById } from "@/app/(core)/usinas/_services/fetch-by-id";
import { fetchUser } from "@/app/auth/_services/user";
import { authOptions } from "@/lib/auth/auth-options";
import type { PageProps } from "@/lib/types/shared";
import { ListHeader } from "./_components/list-header";
import { UsinaPrevisaoList } from "./_components/previsao-list";

export default async function UsinaPrevisaoPage({
	params,
}: PageProps<{ usinaId: string }>) {
	const session = await getServerSession(authOptions);
	const user = await fetchUser(session?.user?.id || "");
	const usina = await fetchUsinaById(user?.usinas?.[0]?.usina?.id || "");

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Previsão</h1>
			<div className="flex gap-2 px-5 py-2 items-center w-full">
				<ListHeader usina={usina} />
			</div>
			<section className="h-full">
				<UsinaPrevisaoList usina={usina} />
			</section>
		</div>
	);
}
