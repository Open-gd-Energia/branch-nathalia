"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { RoundPercentage } from "@/components/round-percentage";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	type Usina,
	usinaClassificacaoOptions,
	usinaStatusesOptions,
} from "@/lib/models/usina";
import {
	setUsinaData,
	toggleOpenUsinaSheet,
} from "@/lib/redux/features/usinas/slice";
import { cn } from "@/lib/utils";
import {
	ListTable,
	type TableColumns,
} from "../../_components/list-screen/table";
import { deleteUsina } from "../_services/delete";
import { fetchUsinas } from "../_services/fetch";
import { fetchUsinaById } from "../_services/fetch-by-id";

const statusesColors = {
	ATIVO: "bg-green-600 text-white",
	INATIVO: "bg-red-600 text-white",
	EM_NEGOCIACAO: "bg-yellow-200 text-primary",
	TROCANDO_TITULARIDADE: "bg-blue-600 text-white",
};

const tableColumns = [
	{
		key: "nome",
		label: "Nome da usina",
		cellProps: { className: "max-w-[190px]" },
	},
	{
		key: "uc",
		label: "UC",
	},
	{
		key: "classificacao",
		label: "Classificação",
		render: (row) => {
			const classificacao =
				row?.classificacao as keyof typeof usinaClassificacaoOptions;
			if (!classificacao) return "-";

			return (
				<Badge>
					{usinaClassificacaoOptions[classificacao] ?? classificacao}
				</Badge>
			);
		},
	},
	{
		key: "distribuidora.nome",
		label: "Distribuidora",
		cellProps: { className: "max-w-[100px]" },
	},
	{
		key: "status",
		label: "Status",
		render: (row) => {
			const status = row?.status;
			if (!status) return "-";

			return (
				<Badge className={cn(statusesColors[status])}>
					{usinaStatusesOptions[status] ?? status}
				</Badge>
			);
		},
	},
	{
		key: "potenciaNominal",
		label: "Potência nominal (kW)",
		cellProps: { className: "max-w-[60px]" },
		render: (row) =>
			Intl.NumberFormat("pt-BR").format(row?.potenciaNominal ?? 0),
	},
	{
		key: "alocacao",
		label: "Alocação",
		cellProps: { className: "max-w-[80px]" },
		render: (row) => {
			const quota = row?.cotaAlocada;

			return quota ? (
				<div className="flex gap-1 items-center">
					<RoundPercentage percentage={quota} />
					{Intl.NumberFormat("pt-BR", {
						style: "percent",
						maximumFractionDigits: 2,
					}).format(quota / 100)}
				</div>
			) : (
				"-"
			);
		},
	},
] as TableColumns<Usina>[];

export interface UsinasListProps {
	data: Usina[];
}

export const UsinasList: FC<UsinasListProps> = ({ data: usinasList }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const formOpen = useAppSelector((state) => state.usinas.sheet.open);
	const filters = useAppSelector((state) => state.usinas.filters);
	const { data, refetch } = useQuery({
		queryKey: ["usinas-list", filters],
		queryFn: async () =>
			fetchUsinas(searchParams.get("search") ?? undefined, {
				...filters,
				calcCotaAlocada: "true",
			}),
		initialData: usinasList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteUsina(id),
		onSuccess: () => {
			toast.success("Usina excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteUsina]:", error);
			toast.error("Erro ao excluir Usina!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const usina = await fetchUsinaById(id);
			if (!usina) {
				toast.error("Usina não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setUsinaData(usina));
			// 3. open form
			dispatch(toggleOpenUsinaSheet(true));
		} catch (error) {
			toast.error("Erro ao editar usina!");
			console.error("[handleOnEdit]:", error);
		}
	};

	const handleOnRowClick = async (id: string | number) => {
		router.push(`/usinas/${id}`);
	};

	useEffect(() => {
		if (!formOpen) {
			refetch();
		}
	}, [formOpen, refetch]);

	return (
		<ListTable
			onRowClick={handleOnRowClick}
			tableColumns={tableColumns}
			rows={data}
			onDelete={(id) => mutateAsync(id)}
			onEdit={handleOnEdit}
		/>
	);
};
