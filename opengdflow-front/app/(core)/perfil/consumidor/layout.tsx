import { getServerSession } from "next-auth";
import { fetchUser } from "@/app/auth/_services/user";
import { authOptions } from "@/lib/auth/auth-options";
import { localeNumberFormat } from "@/lib/utils";
import { fetchConsumerById } from "../../consumidores/_services/fetch-by-id";
import { fetchConsumerEstatisticas } from "../../consumidores/_services/fetch-estatisticas";
import { ConsumerSidebar } from "../../consumidores/[consumerId]/_components/consumer-sidebar";
import { StatsCard } from "../../consumidores/[consumerId]/_components/stats-card";
import { Header } from "./_components/header";
import { ConsumerContentTabs } from "./_components/tabs";

export default async function PerfilConsumidorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	const user = await fetchUser(session?.user?.id || "");
	const consumer = await fetchConsumerById(user?.consumidores?.[0]?.id || "");
	const estatisticas = await fetchConsumerEstatisticas(consumer?.id!);

	if (!consumer) return <p>Consumidor não encontrado</p>;

	return (
		<main className="w-full h-full overflow-hidden">
			<Header consumer={consumer} />

			<div className="flex h-[calc(100%-46px)] w-full">
				<div className="flex-1 flex flex-col w-full overflow-auto">
					{/* page content */}
					<section className="flex flex-col gap-5 p-5">
						<div className="flex flex-col">
							<h1 className="font-semibold leading-7">{consumer?.nome}</h1>
							<span className="text-xs text-muted-foreground font-medium leading-4">
								{consumer?.uc}
							</span>
						</div>
						<div className="flex gap-1 flex-wrap">
							<StatsCard>
								<h3 className="text-xs leading-4">Consumo (último mês)</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.consumoUltimoMes ?? 0)}
								</span>
							</StatsCard>
							<StatsCard>
								<h3 className="text-xs leading-4">Média de consumo</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.consumoMedio ?? 0)}
								</span>
							</StatsCard>
							<StatsCard>
								<h3 className="text-xs leading-4">Consumo Total</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.consumoTotal ?? 0)}
								</span>
							</StatsCard>
							<StatsCard>
								<h3 className="text-xs leading-4">Créditos acumulados</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.creditosAcumulados ?? 0)}
								</span>
							</StatsCard>
							<StatsCard>
								<h3 className="text-xs leading-4">Saldo Faltante</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.saldoFaltante ?? 0)}
								</span>
							</StatsCard>
						</div>
						<ConsumerContentTabs />
					</section>
					<div className="flex-1">{children}</div>
				</div>
				<ConsumerSidebar consumer={consumer} />
			</div>
		</main>
	);
}
