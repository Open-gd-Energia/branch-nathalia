import { useQuery } from "@tanstack/react-query";
import { Layers, Lightbulb, Shuffle, Sun, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { localeEnergyFormat } from "@/lib/utils";
import { fetchDashboardResumoGeral } from "../_services/resumo-geral";
import { StatsCard } from "./stats-card";

export const InfoCards = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["dashboard-resumo-geral"],
		queryFn: fetchDashboardResumoGeral,
	});

	if (isLoading) {
		return (
			<div className="flex gap-2 flex-wrap">
				<Skeleton className="flex flex-col gap-3 rounded-lg min-h-[107px] p-5 w-full max-w-56" />
				<Skeleton className="flex flex-col gap-3 rounded-lg min-h-[107px] p-5 w-full max-w-56" />
				<Skeleton className="flex flex-col gap-3 rounded-lg min-h-[107px] p-5 w-full max-w-56" />
				<Skeleton className="flex flex-col gap-3 rounded-lg min-h-[107px] p-5 w-full max-w-56" />
				<Skeleton className="flex flex-col gap-3 rounded-lg min-h-[107px] p-5 w-full max-w-56" />
			</div>
		);
	}

	return (
		<div className="flex gap-2 flex-wrap">
			<StatsCard.Card>
				<StatsCard.Header>Total de energia gerada</StatsCard.Header>
				<StatsCard.Body>
					<StatsCard.Icon>
						<Zap />
					</StatsCard.Icon>
					<StatsCard.Info>{localeEnergyFormat(data?.totalEnergiaGerada, 4)} kWh</StatsCard.Info>
				</StatsCard.Body>
			</StatsCard.Card>

			<StatsCard.Card>
				<StatsCard.Header>Energia distribuída</StatsCard.Header>
				<StatsCard.Body>
					<StatsCard.Icon>
						<Shuffle />
					</StatsCard.Icon>
					<StatsCard.Info>{localeEnergyFormat(data?.totalEnergiaDistribuida, 4)} kWh</StatsCard.Info>
				</StatsCard.Body>
			</StatsCard.Card>

			<StatsCard.Card>
				<StatsCard.Header>Saldo acumulado</StatsCard.Header>
				<StatsCard.Body>
					<StatsCard.Icon>
						<Layers />
					</StatsCard.Icon>
					<StatsCard.Info>{localeEnergyFormat(data?.saldoAcumulado, 4)} kWh</StatsCard.Info>
				</StatsCard.Body>
			</StatsCard.Card>

			<StatsCard.Card>
				<StatsCard.Header>Usinas ativas</StatsCard.Header>
				<StatsCard.Body>
					<StatsCard.Icon>
						<Sun />
					</StatsCard.Icon>
					<StatsCard.Info>{data?.usinasAtivas}</StatsCard.Info>
				</StatsCard.Body>
			</StatsCard.Card>

			<StatsCard.Card>
				<StatsCard.Header>Consumidores ativos</StatsCard.Header>
				<StatsCard.Body>
					<StatsCard.Icon>
						<Lightbulb />
					</StatsCard.Icon>
					<StatsCard.Info>{data?.consumidoresAtivos}</StatsCard.Info>
				</StatsCard.Body>
			</StatsCard.Card>
		</div>
	);
};
