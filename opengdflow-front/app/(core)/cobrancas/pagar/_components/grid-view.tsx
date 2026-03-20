"use client";

import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { GridColumn } from "@/app/(core)/_components/grid-column";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/redux";
import type { Cobranca } from "@/lib/models/cobranca";
import { fetchCobranca } from "../../_services/fetch";

export interface CobrancasListProps {
	data: Cobranca[];
}

export const GridView: FC<CobrancasListProps> = ({ data: cobrancasList }) => {
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.cobrancas.sheet.open);
	const filters = useAppSelector((state) => state.cobrancas.filters);
	const { data, refetch } = useQuery({
		queryKey: ["cobrancas-list", "PAGAR", filters, searchParams.get("search")],
		queryFn: async () =>
			fetchCobranca({
				...filters,
				identificador: searchParams.get("search"),
				tipo: "PAGAR",
			}),
		initialData: cobrancasList,
	});

	const cobrancasByStatus = data.reduce(
		(acc, cobranca) => {
			const status = cobranca.status || "SEM_STATUS";
			if (!acc[status]) {
				acc[status] = [];
			}
			acc[status].push(cobranca);
			return acc;
		},
		{} as Record<string, Cobranca[]>,
	);

	const statuses = Object.keys(cobrancasByStatus).filter(
		(status) => status !== "SEM_STATUS",
	);

	useEffect(() => {
		if (!formOpen) {
			refetch();
		}
	}, [formOpen, refetch]);

	useEffect(() => {
		refetch();
	}, [filters]);

	return (
		<div className="grid grid-flow-col auto-cols-[257px] gap-2 p-2 overflow-y-hidden">
			{/* Column for cobrancas without status */}
			<GridColumn
				title="Sem Status"
				amount={cobrancasByStatus.SEM_STATUS?.length ?? 0}
			>
				{cobrancasByStatus.SEM_STATUS?.map((cobranca) => (
					<ColumnCard key={cobranca.id} cobranca={cobranca} />
				))}
			</GridColumn>

			{/* Columns for each status */}
			{statuses.map((status) => (
				<GridColumn
					key={status}
					title={status}
					amount={cobrancasByStatus[status]?.length ?? 0}
				>
					{cobrancasByStatus[status]?.map((cobranca) => (
						<ColumnCard key={cobranca.id} cobranca={cobranca} />
					))}
				</GridColumn>
			))}
		</div>
	);
};

export interface ColumnCardProps {
	cobranca: Cobranca;
}

export const ColumnCard: FC<ColumnCardProps> = ({ cobranca }) => {
	const router = useRouter();

	const handleOnEdit = async (id: string | number) => {
		router.push(`/cobrancas/pagar/${id}`);
	};

	return (
		<Card
			key={cobranca.id}
			className="rounded-md h-fit gap-0 p-2 space-y-2 cursor-pointer hover:bg-accent"
			onClick={() => handleOnEdit(cobranca.id ?? "")}
		>
			<div className="flex flex-col gap-1">
				<span className="text-sm font-medium">{cobranca?.usina?.nome}</span>
				<span className="text-xs text-muted-foreground">
					{cobranca?.usina?.uc}
				</span>
			</div>
			<div>
				<span className="text-[13px]">
					{cobranca?.mesReferencia
						? format(parseISO(cobranca?.mesReferencia), "MMM/yyyy", {
								locale: ptBR,
							}).toUpperCase()
						: ""}
				</span>
				<div className="flex justify-between items-center text-[13px]">
					<span>
						{cobranca?.dataVencimento
							? format(parseISO(cobranca?.dataVencimento), "dd/MM/yyyy")
							: ""}
					</span>
					<span>
						{cobranca?.valorTotal
							? new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL",
								}).format(cobranca?.valorTotal)
							: ""}
					</span>
				</div>
			</div>
		</Card>
	);
};
