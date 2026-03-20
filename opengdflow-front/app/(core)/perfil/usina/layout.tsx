import { getServerSession } from "next-auth";
import type { PropsWithChildren } from "react";
import { fetchUser } from "@/app/auth/_services/user";
import { authOptions } from "@/lib/auth/auth-options";
import { localeNumberFormat } from "@/lib/utils";
import { fetchUsinaById } from "../../usinas/_services/fetch-by-id";
import { fetchEstatisticasGeracao } from "../../usinas/_services/fetch-estatisticas";
import { Header } from "./_components/header";
import { StatsCard } from "./_components/stats-card";
import { UsinaContentTabs } from "./_components/tabs";
import { UsinaSidebar } from "./_components/usina-sidebar";

type UsinaLayoutProps = PropsWithChildren;

export default async function UsinaEntryPage({ children }: UsinaLayoutProps) {
	const session = await getServerSession(authOptions);
	const user = await fetchUser(session?.user?.id || "");
	const usina = await fetchUsinaById(user?.usinas?.[0]?.usina?.id || "");
	const estatisticas = await fetchEstatisticasGeracao(usina?.id!);

	if (!usina) return <p>Usina não encontrada</p>;

	return (
		<main className="w-full h-full overflow-hidden">
			<Header usina={usina} />

			<div className="flex h-[calc(100%-46px)] w-full">
				<div className="flex-1 flex flex-col w-full overflow-auto">
					{/* page content */}
					<section className="flex flex-col gap-5 p-5">
						<div className="flex flex-col">
							<h1 className="font-semibold leading-7">{usina?.nome}</h1>
							<span className="text-xs text-muted-foreground font-medium leading-4">
								{usina?.uc}
							</span>
						</div>
						<div className="flex gap-1 flex-wrap">
							<StatsCard>
								<h3 className="text-xs leading-4">Potência</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.potencia ?? 0)}
								</span>
							</StatsCard>
							<StatsCard>
								<h3 className="text-xs leading-4">Média de geração</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.mediaGeracao ?? 0)}
								</span>
							</StatsCard>
							<StatsCard>
								<h3 className="text-xs leading-4">Geração total</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.geracaoTotal ?? 0)}
								</span>
							</StatsCard>
							<StatsCard>
								<h3 className="text-xs leading-4">Alocação total</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.alocacaoAtual ?? 0)}
								</span>
							</StatsCard>
							<StatsCard>
								<h3 className="text-xs leading-4">Crédito acumulado</h3>
								<span className="text-sm text-foreground font-medium leading-6">
									{localeNumberFormat(estatisticas?.creditoAcumulado ?? 0)}
								</span>
							</StatsCard>
						</div>
						<UsinaContentTabs />
					</section>
					<div className="flex-1">{children}</div>
				</div>
				<UsinaSidebar usina={usina!} />
			</div>
		</main>
	);
}
