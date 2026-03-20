"use client";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { fetchInvoices } from "@/app/(core)/faturas/_services/fetch";
import { useAppSelector } from "@/hooks/redux";
import type { Consumer } from "@/lib/models/consumer";
import type { Invoice } from "@/lib/models/invoices";
import { clearInvoicesFilters } from "@/lib/redux/features/invoices/slice";

export interface ConsumidorConsumerListProps {
	consumer: Consumer | null;
}

const tableColumns = [
	{
		key: "mesReferencia",
		label: "Mês de referência",
		render: (row) =>
			row?.mesReferencia
				? format(parseISO(row?.mesReferencia), "MMM/yyyy", {
						locale: ptBR,
					}).toUpperCase()
				: "",
	},
	{
		key: "consumoLocalUsina",
		label: "Consumo total (kWh)",
		render: (row) =>
			row?.consumo ? Intl.NumberFormat("pt-BR").format(row?.consumo) : "-",
	},
	{
		key: "geracaoPropria",
		label: "Geração própria (kWh)",
		render: (row) =>
			row?.leituraAtualGeracao
				? row?.leituraAtualGeracao?.toLocaleString("pt-BR", {
						style: "decimal",
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})
				: "-",
	},
	{
		key: "consumoRef",
		label: "Consumo ref. (kWh)",
		render: (row) =>
			row?.leituraAtualConsumo
				? Intl.NumberFormat("pt-BR").format(row?.leituraAtualConsumo)
				: "-",
	},
	{
		key: "saldoCredito",
		label: "Saldo de crédito (kWh)",
		render: (row) =>
			row?.movimentacaoSaldo
				? Intl.NumberFormat("pt-BR").format(row?.movimentacaoSaldo)
				: "-",
	},
] as TableColumns<Invoice>[];

export const ConsumidorConsumoList: FC<ConsumidorConsumerListProps> = ({
	consumer,
}) => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const filters = useAppSelector((state) => state.invoices.filters);
	const { data, refetch } = useQuery({
		queryKey: ["consumer-invoices", consumer?.id],
		queryFn: () =>
			fetchInvoices(searchParams.get("search") ?? undefined, {
				...filters,
				ucConsumidor: consumer?.uc,
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

	if (!consumer) return <div>Consumidor não encontrado</div>;

	return <ListTable tableColumns={tableColumns} rows={data || []} />;
};
