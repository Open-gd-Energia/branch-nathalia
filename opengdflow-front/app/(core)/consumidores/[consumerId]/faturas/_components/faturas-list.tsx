"use client";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { FaturaSummaryViewSheet } from "@/app/(core)/_components/fatura-summary-view-sheet";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { UpsertInvoiceSheet } from "@/app/(core)/faturas/_components/upsert-invoice";
import { fetchInvoices } from "@/app/(core)/faturas/_services/fetch";
import { fetchInvoiceById } from "@/app/(core)/faturas/_services/fetch-by-id";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { Consumer } from "@/lib/models/consumer";
import type { Invoice } from "@/lib/models/invoices";
import {
	cleanInvoiceData,
	clearInvoicesFilters,
	setInvoiceData,
	toggleOpenInvoiceSheet,
} from "@/lib/redux/features/invoices/slice";

export interface ConsumidorFaturasListProps {
	consumer: Consumer | null;
}

const tableColumns = [
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
				? format(parseISO(row?.mesReferencia), "MMM/yyyy", {
						locale: ptBR,
					}).toUpperCase()
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
		key: "energiaInjetada",
		label: "Energia injetada",
		render: (row) =>
			row?.energiaInjetada
				? row?.energiaInjetada?.toLocaleString("pt-BR", {
						style: "decimal",
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})
				: "",
	},
	{
		key: "valorEnergiaCompensada",
		label: "Energia compensada",
		render: (row) =>
			row?.valorEnergiaCompensada
				? row?.valorEnergiaCompensada?.toLocaleString("pt-BR", {
						style: "decimal",
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})
				: "",
	},
	{
		key: "saldoAcumuladoAtual",
		label: "Saldo de energia (kWh)",
		render: (row) =>
			row?.saldoAcumuladoAtual
				? row?.saldoAcumuladoAtual?.toLocaleString("pt-BR", {
						style: "decimal",
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})
				: "",
	},
	{
		key: "consumoLocalUsina",
		label: "Consumo total (kWh)",
		render: (row) =>
			row?.consumoLocalUsina
				? row?.consumoLocalUsina?.toLocaleString("pt-BR", {
						style: "decimal",
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})
				: "",
	},
	{
		key: "valorTotalFatura",
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

export const ConsumidorFaturasList: FC<ConsumidorFaturasListProps> = ({
	consumer,
}) => {
	const router = useRouter();
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
			router.back();
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
