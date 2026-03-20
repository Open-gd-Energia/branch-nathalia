import type { LayoutProps } from "@/lib/types/shared";
import { localeNumberFormat } from "@/lib/utils";
import { fetchConsumerById } from "../_services/fetch-by-id";
import { fetchConsumerEstatisticas } from "../_services/fetch-estatisticas";
import { ConsumerSidebar } from "./_components/consumer-sidebar";
import { StatsCard } from "./_components/stats-card";
import { ConsumerContentTabs } from "./_components/tabs";

type ConsumerLayoutProps = LayoutProps<{ consumerId: string }>;

export default async function ProfileLayout({
	children,
	params,
}: ConsumerLayoutProps) {
	const parameters = await params;
	const consumer = await fetchConsumerById(parameters?.consumerId || "");
	const estatisticas = await fetchConsumerEstatisticas(
		parameters?.consumerId || "",
	);

	return (
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
			<ConsumerSidebar consumer={consumer!} />
		</div>
	);
}
