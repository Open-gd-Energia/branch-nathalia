"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/redux";
import {
	type Cobranca,
	type CobrancaStatus,
	cobrancaStatuses,
} from "@/lib/models/cobranca";
import { deleteCobranca } from "../../_services/delete";
import { fetchCobranca } from "../../_services/fetch";

export const cobrancaBadgesProps = {
	RASCUNHO: {
		className: "bg-yellow-200 text-black",
	},
	AGUARDANDO_FATURA: {
		className: "bg-yellow-200 text-black",
	},
	FATURANDO: {
		className: "bg-green-200",
	},
	EM_ABERTO: {
		className: "bg-blue-200",
	},
	PAGO: {
		className: "bg-green-200",
	},
	VENCIDO: {
		className: "bg-red-200",
	},
	NAO_FATURADO: {
		className: "bg-red-200",
	},
	CANCELADO: {
		className: "bg-red-200",
	},
};

const tableColumns = [
	{
		key: "consumidor.nome",
		label: "Nome da consumidor",
		cellProps: { className: "max-w-[150px]" },
	},
	{
		key: "consumidor.uc",
		label: "UC",
	},
	{
		key: "mesReferencia",
		label: "Mês de referência",
		render: (row) =>
			row?.mesReferencia
				? format(parseISO(row?.mesReferencia), "MMM/yyyy", { locale: ptBR })
				: "",
	},
	{
		key: "dataVencimento",
		label: "Data de vencimento",
		render: (row) =>
			row?.dataVencimento
				? format(parseISO(row?.dataVencimento), "dd/MM/yyyy", { locale: ptBR })
				: "",
	},
	{
		key: "valorTotal",
		label: "Valor total",
		render: (row) =>
			row?.valorTotal
				? new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: "BRL",
					}).format(row?.valorTotal)
				: "",
	},
	{
		key: "status",
		label: "Status",
		render: (row) => {
			const statusText = cobrancaStatuses[row?.status as CobrancaStatus];
			const badgeConfig = cobrancaBadgesProps[row?.status as CobrancaStatus];
			return <Badge {...badgeConfig}>{statusText}</Badge>;
		},
	},
] as TableColumns<Cobranca>[];

export interface CobrancasListProps {
	data: Cobranca[];
}

export const ListView: FC<CobrancasListProps> = ({ data: cobrancasList }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.cobrancas.sheet.open);
	const filters = useAppSelector((state) => state.cobrancas.filters);
	const { data, refetch } = useQuery({
		queryKey: [
			"cobrancas-list",
			"RECEBER",
			filters,
			searchParams.get("search") ?? "",
		],
		queryFn: async () =>
			fetchCobranca({
				...filters,
				identificador: searchParams.get("search"),
				tipo: "RECEBER",
			}),
		initialData: cobrancasList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteCobranca(id),
		onSuccess: () => {
			toast.success("Cobrança excluída com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteCobranca]:", error);
			toast.error("Erro ao excluir cobrança!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/cobrancas/receber/${id}`);
	};

	useEffect(() => {
		if (!formOpen) {
			refetch();
		}
	}, [formOpen, refetch]);

	useEffect(() => {
		refetch();
	}, [filters]);

	return (
		<ListTable
			tableColumns={tableColumns}
			rows={data}
			onDelete={(id) => mutateAsync(id)}
			onEdit={handleOnEdit}
		/>
	);
};
