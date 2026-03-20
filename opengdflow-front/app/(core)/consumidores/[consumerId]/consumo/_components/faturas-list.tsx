"use client";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { UpsertInvoiceSheet } from "@/app/(core)/faturas/_components/upsert-invoice";
import { fetchInvoices } from "@/app/(core)/faturas/_services/fetch";
import { fetchInvoiceById } from "@/app/(core)/faturas/_services/fetch-by-id";
import { useAppSelector } from "@/hooks/redux";
import type { Consumer } from "@/lib/models/consumer";
import type { Invoice } from "@/lib/models/invoices";
import {
	cleanInvoiceData,
	clearInvoicesFilters,
	setInvoiceData,
	toggleOpenInvoiceSheet,
} from "@/lib/redux/features/invoices/slice";

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
	const { data } = useQuery({
		queryKey: [
			"consumer-invoices",
			consumer?.id,
			filters,
			searchParams?.get("search"),
		],
		queryFn: () =>
			fetchInvoices(searchParams.get("search") ?? undefined, {
				...filters,
				ucConsumidor: consumer?.uc,
			}),
	});

	useEffect(() => {
		return () => {
			dispatch(clearInvoicesFilters());
		};
	}, [searchParams]);

	useEffect(() => {
		return () => {
			dispatch(cleanInvoiceData());
			dispatch(toggleOpenInvoiceSheet(false));
		};
	}, []);

	if (!consumer) return <div>Consumidor não encontrado</div>;

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const invoice = await fetchInvoiceById(id);
			if (!invoice) {
				toast.error("Fatura não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setInvoiceData(invoice));
			// 3. open form
			dispatch(toggleOpenInvoiceSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de fatura!");
			console.error("[handleOnEdit]:", error);
		}
	};

	const handleClose = () => {
		dispatch(cleanInvoiceData());
		dispatch(toggleOpenInvoiceSheet(false));
	};

	return (
		<>
			<ListTable
				tableColumns={tableColumns}
				rows={data || []}
				onRowClick={(id) => handleOnEdit(id)}
			/>
			<UpsertInvoiceSheet onSuccess={handleClose} onClose={handleClose} />
		</>
	);
};
