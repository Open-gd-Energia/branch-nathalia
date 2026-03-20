"use client";

import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/redux";
import type { Invoice } from "@/lib/models/invoices";
import { GridColumn } from "../../_components/grid-column";
import { fetchInvoices } from "../_services/fetch";

export interface InvoicesListProps {
	data: Invoice[];
}

export const GridView: FC<InvoicesListProps> = ({ data: invoicesList }) => {
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.invoices.sheet.open);
	const filters = useAppSelector((state) => state.invoices.filters);
	const { data, refetch } = useQuery({
		queryKey: ["invoices-list", filters],
		queryFn: async () =>
			fetchInvoices(searchParams.get("search") ?? undefined, filters),
		initialData: invoicesList,
	});

	const invoicesByStatus = data.reduce(
		(acc, invoice) => {
			const status = invoice.status || "SEM_STATUS";
			if (!acc[status]) {
				acc[status] = [];
			}
			acc[status].push(invoice);
			return acc;
		},
		{} as Record<string, Invoice[]>,
	);

	const statuses = Object.keys(invoicesByStatus).filter(
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
			{/* Column for invoices without status */}
			<GridColumn
				title="Sem Status"
				amount={invoicesByStatus.SEM_STATUS?.length ?? 0}
			>
				{invoicesByStatus.SEM_STATUS?.map((invoice) => (
					<InvoiceCard invoice={invoice} key={invoice.id} />
				))}
			</GridColumn>

			{/* Columns for each status */}
			{statuses.map((status) => (
				<GridColumn
					key={status}
					title={status}
					amount={invoicesByStatus[status]?.length ?? 0}
				>
					{invoicesByStatus[status]?.map((invoice) => (
						<InvoiceCard invoice={invoice} key={invoice.id} />
					))}
				</GridColumn>
			))}
		</div>
	);
};

const InvoiceCard: FC<{ invoice: Invoice }> = ({ invoice }) => {
	const router = useRouter();

	const handleOnEdit = async (id: string | number) => {
		router.push(`/faturas/${id}`);
	};

	return (
		<Card
			key={invoice.id}
			className="rounded-md h-fit gap-0 p-2 space-y-2 cursor-pointer hover:bg-accent transition-colors duration-270 ease-in-out"
			onClick={() => handleOnEdit(invoice.id)}
		>
			<div className="flex flex-col gap-1">
				<span className="text-sm font-medium">
					{invoice?.usina?.nome ?? invoice?.consumidor?.nome}
				</span>
				<span className="text-xs text-muted-foreground">
					{invoice?.usina?.uc ?? invoice?.consumidor?.uc}
				</span>
			</div>
			<div className="flex flex-col gap-1">
				<span className="text-sm">
					{invoice?.mesReferencia
						? format(parseISO(invoice?.mesReferencia), "MMM/yyyy", {
								locale: ptBR,
							}).toUpperCase()
						: "--"}
				</span>
				<div className="flex justify-between">
					<span className="text-sm">
						{invoice?.vencimento
							? format(parseISO(invoice?.vencimento), "dd/MM/yyyy")
							: "--"}
					</span>
					<span className="text-sm">
						{invoice?.valorTotalFatura
							? new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL",
								}).format(invoice?.valorTotalFatura)
							: "--"}
					</span>
				</div>
			</div>
		</Card>
	);
};
