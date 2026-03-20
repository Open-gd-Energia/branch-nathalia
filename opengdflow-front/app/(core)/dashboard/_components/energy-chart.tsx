"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type DashboardEnergiaGeradaConsumidaFilters,
	fetchEnergiaGeradaVsConsumida,
} from "../_services/energia-gerada-vs-consumida";

export const description = "An interactive area chart";

// --- Função para calcular as datas iniciais ---
// Usada para definir o estado inicial
const getInitialDates = (
	range: string,
): DashboardEnergiaGeradaConsumidaFilters => {
	const today = new Date();
	const dataFinal = format(today, "yyyy-MM-dd");
	const dataInicial = new Date(today);

	const daysToSubtract = parseInt(range.replace("d", ""), 10);

	if (!Number.isNaN(daysToSubtract)) {
		dataInicial.setDate(today.getDate() - daysToSubtract);
	}

	return {
		dataInicial: format(dataInicial, "yyyy-MM-dd"),
		dataFinal: dataFinal,
	};
};

const chartConfig = {
	energiaGerada: {
		label: "Energia Gerada",
		color: "var(--chart-1)",
	},
	energiaConsumida: {
		label: "Energia Consumida",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function EnergyChart() {
	const [timeRange, setTimeRange] = useState("180d");
	const [filterDates, setFilterDates] =
		useState<DashboardEnergiaGeradaConsumidaFilters>(() =>
			getInitialDates(timeRange),
		);

	const { data: filteredData, isFetching } = useQuery({
		queryKey: ["energiagerada-vs-energiaconsumida", filterDates],
		queryFn: () => fetchEnergiaGeradaVsConsumida(filterDates),
	});

	const setNewTimeRange = (value: string) => {
		setTimeRange(value);
		const newDates = getInitialDates(value);
		setFilterDates(newDates);
	};

	return (
		<Card className="gap-0 pt-0 w-full">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="flex flex-1 gap-1 items-center">
					<CardTitle>Energia Gerada x Consumida (kWh)</CardTitle>
					{isFetching && <Loader2 size={14} className="animate-spin" />}
				</div>
				<Select value={timeRange} onValueChange={setNewTimeRange}>
					<SelectTrigger
						className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="30d" className="rounded-lg">
							Últimos 30 dias
						</SelectItem>
						<SelectItem value="90d" className="rounded-lg">
							Últimos 3 meses
						</SelectItem>
						<SelectItem value="180d" className="rounded-lg">
							Últimos 6 meses
						</SelectItem>
						<SelectItem value="365d" className="rounded-lg">
							Últimos 12 meses
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient
								id="fillenergiaGerada"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-energiaGerada)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-energiaGerada)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient
								id="fillenergiaConsumida"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-energiaConsumida)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-energiaConsumida)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="mesReferencia"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								if (!value) return "";
								const date = new Date(value);
								return format(date, "MMM/yyyy", { locale: ptBR });
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										if (!value) return "";
										try {
											const date = new Date(value);
											return format(date, "MM/yyyy", { locale: ptBR });
										} catch (error) {
											console.error(error);
											return "";
										}
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="energiaGerada"
							type="natural"
							fill="url(#fillenergiaConsumida)"
							stroke="var(--color-energiaConsumida)"
							stackId="a"
						/>
						<Area
							dataKey="energiaConsumida"
							type="natural"
							fill="url(#fillenergiaGerada)"
							stroke="var(--color-energiaGerada)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
