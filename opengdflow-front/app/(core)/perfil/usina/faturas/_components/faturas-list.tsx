"use client";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaturaSummaryViewSheet } from "@/app/(core)/_components/fatura-summary-view-sheet";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { fetchInvoices } from "@/app/(core)/faturas/_services/fetch";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { Invoice } from "@/lib/models/invoices";
import type { Usina } from "@/lib/models/usina";
import { clearInvoicesFilters } from "@/lib/redux/features/invoices/slice";
import { localeCurrencyFormat, localeNumberFormat } from "@/lib/utils";

export interface UsinaFaturasListProps {
	usina: Usina | null;
}

const tableColumns = [
	{
		key: "mesReferencia",
		label: "Mês de referência",
		cellProps: { className: "max-w-[100px]" },
		render: (row) =>
			row?.mesReferencia
				? format(parseISO(row?.mesReferencia), "MMM/yyyy", {
						locale: ptBR,
					}).toUpperCase()
				: "",
	},
	{
		key: "vencimento",
		label: "Data de vencimento",
		cellProps: { className: "max-w-[120px]" },
		render: (row) =>
			row?.vencimento
				? format(parseISO(row?.vencimento), "dd/MM/yyyy", { locale: ptBR })
				: "",
	},
	{
		key: "energiaInjetada",
		label: "Energia injetada",
		cellProps: { className: "max-w-[100px]" },
		render: (row) => localeNumberFormat(row?.energiaInjetada),
	},
	{
		key: "valorEnergiaCompensada",
		label: "Energia compensada",
		cellProps: { className: "max-w-[100px]" },
		render: (row) => localeNumberFormat(row?.valorEnergiaCompensada),
	},
	{
		key: "excedente",
		label: "Excedente de energia",
		cellProps: { className: "max-w-[100px]" },
		// FIXME: Get it from?
		render: (_row) => "::",
	},
	{
		key: "valorTotalFatura",
		label: "Valor total",
		render: (row) => localeCurrencyFormat(row?.valorTotalFatura),
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
				<div onClick={(e) => e.stopPropagation()}>
					<FaturaSummaryViewSheet fatura={row}>
						<Button variant="outline" className="size-7">
							<Eye />
						</Button>
					</FaturaSummaryViewSheet>
				</div>
			);
		},
	},
] as TableColumns<Invoice>[];

export const UsinaFaturasList: FC<UsinaFaturasListProps> = ({ usina }) => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const filters = useAppSelector((state) => state.invoices.filters);
	const { data, refetch } = useQuery({
		queryKey: ["usina-invoices", usina?.id],
		queryFn: () =>
			fetchInvoices(searchParams.get("search") ?? undefined, {
				...filters,
				ucUsina: usina?.uc,
			}),
	});

	useEffect(() => {
		refetch();
	}, [filters, searchParams]);

	useEffect(() => {
		return () => {
			dispatch(clearInvoicesFilters());
		};
	}, [searchParams]);

	if (!usina) return <div>Usina não encontrada</div>;

	return <ListTable tableColumns={tableColumns} rows={data || []} />;
};
