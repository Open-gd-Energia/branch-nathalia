"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { EnsureDeleteModal } from "@/components/ensure-delete-modal";
import { RoundPercentage } from "@/components/round-percentage";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import {
	type AlocacaoItem,
	alocacaoStatusOptions,
} from "@/lib/models/alocacao";
import { cn } from "@/lib/utils";
import {
	ListTable,
	type TableColumns,
} from "../../_components/list-screen/table";
import { deleteAlocacao } from "../_services/delete";
import { fetchAlocacaoItems } from "../_services/fetch-alocacao-item";

const statusesColors = {
	ATIVO: "bg-green-600 text-white",
	INATIVO: "bg-red-600 text-white",
	AGUARDANDO_PROTOCOLO: "bg-purple-600 text-white",
	SENDO_SUBSTITUIDO: "bg-orange-600 text-white",
};

export interface AlocacaoListProps {
	data: AlocacaoItem[];
}

export const AlocacaoList: FC<AlocacaoListProps> = ({ data: alocacaoList }) => {
	const formOpen = useAppSelector((state) => state.alocacao.sheet.open);
	const filters = useAppSelector((state) => state.alocacao.alocacaoItemFilters);
	const { data, refetch } = useQuery({
		queryKey: ["alocacao-list"],
		queryFn: async () => fetchAlocacaoItems(filters),
		initialData: alocacaoList,
	});
	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (id: string | number) => deleteAlocacao(id),
		onSuccess: () => {
			toast.success("Alocacao excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteAlocacao]:", error);
			toast.error("Erro ao excluir alocacao!");
		},
	});

	useEffect(() => {
		if (!formOpen) {
			refetch();
		}
	}, [formOpen, refetch]);

	useEffect(() => {
		refetch();
	}, [filters]);

	const tableColumns = [
		{
			key: "alocacao.usina.nome",
			label: "Nome da usina",
			cellProps: { className: "max-w-[150px]" },
		},
		{
			key: "alocacao.usina.uc",
			label: "UC",
		},
		{
			key: "consumidor.nome",
			label: "Nome do consumidor",
			cellProps: { className: "max-w-[150px]" },
		},
		{
			key: "consumidor.uc",
			label: "UC",
		},
		{
			key: "status",
			label: "Status",
			render: (row) => {
				const status = row?.alocacao
					?.status as keyof typeof alocacaoStatusOptions;
				return row?.alocacao?.status ? (
					<Badge className={cn(statusesColors[status])}>
						{alocacaoStatusOptions[status] || row.alocacao?.status}
					</Badge>
				) : (
					"-"
				);
			},
			cellProps: { className: "max-w-[100px]" },
		},
		{
			key: "dataInicio",
			label: "Data de início",
			render: (row) =>
				row?.alocacao?.dataInicio
					? format(new Date(row?.alocacao?.dataInicio), "dd/MM/yyyy", {
							locale: ptBR,
						})
					: "",
		},
		{
			key: "dataFinal",
			label: "Data final",
			render: (row) =>
				row?.alocacao?.dataFinal
					? format(new Date(row?.alocacao?.dataFinal), "dd/MM/yyyy", {
							locale: ptBR,
						})
					: "",
		},
		{
			key: "quota",
			label: "Quota alocada",
			render: (row) => {
				const quota = row?.quota;
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
		{
			key: "edit",
			label: "",
			render: (row) => {
				return (
					<Link
						className={buttonVariants({ size: "icon", variant: "ghost" })}
						href={`/alocacao/${row.alocacao?.id}`}
					>
						<Pencil />
					</Link>
				);
			},
		},
		{
			key: "delete",
			label: "",
			render: (row) => {
				return (
					<EnsureDeleteModal
						loading={isPending}
						onDelete={() => mutateAsync(row?.alocacao?.id as number)}
					>
						<Button
							size="icon"
							variant="ghost"
							className="text-destructive"
							onClick={(e) => e.stopPropagation()}
						>
							<Trash2 />
						</Button>
					</EnsureDeleteModal>
				);
			},
		},
	] as TableColumns<AlocacaoItem>[];

	return <ListTable tableColumns={tableColumns} rows={data || []} />;
};
