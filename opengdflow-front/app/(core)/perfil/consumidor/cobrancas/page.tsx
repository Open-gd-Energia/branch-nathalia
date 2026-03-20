import { getServerSession } from "next-auth";
import { fetchConsumerById } from "@/app/(core)/consumidores/_services/fetch-by-id";
import { fetchUser } from "@/app/auth/_services/user";
import { authOptions } from "@/lib/auth/auth-options";
import { ConsumidorCobrancasList } from "./_components/cobrancas-list";
import { ListHeader } from "./_components/list-header";

export default async function ConsumerAlocacaoPage() {
	const session = await getServerSession(authOptions);
	const user = await fetchUser(session?.user?.id || "");
	const consumer = await fetchConsumerById(user?.consumidores?.[0]?.id || "");

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Cobranças</h1>
			<div className="flex gap-2 px-5 py-2 items-center w-full">
				<ListHeader consumer={consumer} />
			</div>
			<section className="h-full">
				<ConsumidorCobrancasList consumer={consumer} />
			</section>
		</div>
	);
}
