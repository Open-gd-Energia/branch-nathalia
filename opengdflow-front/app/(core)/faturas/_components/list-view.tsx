"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { Invoice } from "@/lib/models/invoices";
import { FaturaSummaryViewSheet } from "../../_components/fatura-summary-view-sheet";
import {
	ListTable,
	type TableColumns,
} from "../../_components/list-screen/table";
import { deleteInvoice } from "../_services/delete";
import { fetchInvoices } from "../_services/fetch";

const tableColumns = [
	{
		key: "usina.nome",
		label: "Nome da usina",
		cellProps: { className: "max-w-[150px]" },
	},
	{
		key: "usina.uc",
		label: "UC",
	},
	{
		key: "consumidor.nome",
		cellProps: { className: "max-w-[150px]" },
		label: "Nome do consumidor",
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
		key: "vencimento",
		label: "Data de vencimento",
		render: (row) =>
			row?.vencimento
				? format(parseISO(row?.vencimento), "dd/MM/yyyy", { locale: ptBR })
				: "",
	},
	{
		key: "valor",
		label: "Valor total",
		render: (row) =>
			row?.valorTotalFatura
				? row?.valorTotalFatura?.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
					})
				: "",
	},
	{
		key: "status",
		label: "Status",
		badge: true,
	},
	{
		key: "acoes",
		cellProps: { className: "text-center" },
		render: (row) => {
			return (
				<FaturaSummaryViewSheet fatura={row}>
					<Button variant="outline" className="size-7">
						<Eye />
					</Button>
				</FaturaSummaryViewSheet>
			);
		},
	},
] as TableColumns<Invoice>[];

export interface InvoicesListProps {
	data: Invoice[];
}

export const ListView: FC<InvoicesListProps> = ({ data: invoicesList }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.invoices.sheet.open);
	const filters = useAppSelector((state) => state.invoices.filters);
	const { data, refetch } = useQuery({
		queryKey: ["invoices-list", filters],
		queryFn: async () =>
			fetchInvoices(searchParams.get("search") ?? undefined, filters),
		initialData: invoicesList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteInvoice(id),
		onSuccess: () => {
			toast.success("Usuário excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteInvoice]:", error);
			toast.error("Erro ao excluir usuário!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/faturas/${id}`);
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
