import { getServerSession } from "next-auth";
import { fetchUsinaById } from "@/app/(core)/usinas/_services/fetch-by-id";
import { fetchUser } from "@/app/auth/_services/user";
import { authOptions } from "@/lib/auth/auth-options";
import type { PageProps } from "@/lib/types/shared";
import { ListHeader } from "./_components/list-header";
import { UsinaOrdensPagamentoList } from "./_components/ordens-pagamento-list";

export default async function UsinaOrdensPagamentoPage({
	params,
}: PageProps<{ usinaId: string }>) {
	const session = await getServerSession(authOptions);
	const user = await fetchUser(session?.user?.id || "");
	const usina = await fetchUsinaById(user?.usinas?.[0]?.usina?.id || "");

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Recebíveis</h1>
			<div className="flex gap-2 px-5 py-2 items-center w-fit">
				<ListHeader usina={usina} />
			</div>
			<section className="h-full">
				<UsinaOrdensPagamentoList usina={usina} />
			</section>
		</div>
	);
}
