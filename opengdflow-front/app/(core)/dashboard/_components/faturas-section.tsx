"use client";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/redux";
import type { Invoice } from "@/lib/models/invoices";
import {
	cleanInvoiceData,
	setInvoiceData,
	toggleOpenInvoiceSheet,
} from "@/lib/redux/features/invoices/slice";
import { localeCurrencyFormat } from "@/lib/utils";
import {
	ListTable,
	type TableColumns,
} from "../../_components/list-screen/table";
import { UpsertInvoiceSheet } from "../../faturas/_components/upsert-invoice";
import { fetchInvoices } from "../../faturas/_services/fetch";
import { fetchInvoiceById } from "../../faturas/_services/fetch-by-id";

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
		key: "consumidor.uc",
		cellProps: { className: "max-w-[150px]" },
		label: "UC",
	},
	{
		key: "mesReferencia",
		label: "Mês de referência",
		render: (row) =>
			row?.mesReferencia
				? format(parseISO(row?.mesReferencia), "MMM/yyyy", {
						locale: ptBR,
					})?.toUpperCase()
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
			row?.valorTotalFatura != null
				? localeCurrencyFormat(row.valorTotalFatura)
				: "",
	},
	{
		key: "status",
		label: "Status",
		badge: true,
	},
] as TableColumns<Invoice>[];

export const FaturasSection = () => {
	const dispatch = useAppDispatch();

	const { data: faturasVencidas, refetch: refetchFaturasVencidas } = useQuery({
		queryKey: ["expired-invoices-list"],
		queryFn: async () =>
			fetchInvoices(undefined, {
				vencimentoFinal: format(
					set(new Date(), { date: new Date().getDate() - 1 }),
					"yyyy-MM-dd",
				),
			}),
	});

	const { data: faturasAVencer, refetch: refetchFaturasAVencer } = useQuery({
		queryKey: ["unexpired-invoices-list"],
		queryFn: async () =>
			fetchInvoices(undefined, {
				vencimentoInicial: format(new Date(), "yyyy-MM-dd"),
			}),
	});

	const handleTabChange = (value: string) => {
		if (value === "vencidas") {
			refetchFaturasVencidas();
		} else if (value === "a-vencer") {
			refetchFaturasAVencer();
		}
	};

	useEffect(() => {
		return () => {
			dispatch(cleanInvoiceData());
			dispatch(toggleOpenInvoiceSheet(false));
		};
	}, []);

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
			toast.error("Erro ao editar fatura!");
			console.error("[handleOnEdit]:", error);
		}
	};

	const handleClose = () => {
		dispatch(cleanInvoiceData());
		dispatch(toggleOpenInvoiceSheet(false));
	};

	return (
		<>
			<section className="flex flex-col gap-4 w-full">
				<Tabs defaultValue="vencidas" onValueChange={handleTabChange}>
					<div className="flex justify-between items-center">
						<div className="flex gap-5">
							<h2 className="font-semibold leading-7">Faturas</h2>
							<TabsList>
								<TabsTrigger value="vencidas">Vencidas</TabsTrigger>
								<TabsTrigger value="a-vencer">A vencer</TabsTrigger>
							</TabsList>
						</div>

						<Link
							href="/faturas"
							className="text-sm text-blue-500 hover:underline font-medium"
						>
							Explorar
						</Link>
					</div>

					<TabsContent value="vencidas">
						<ListTable
							onRowClick={handleOnEdit}
							wrapperClassName="border border-b-0 rounded-t-md"
							footerWrapperProps={{
								className: "border border-t-0 rounded-b-md",
							}}
							tableColumns={tableColumns}
							rows={faturasVencidas || []}
						/>
					</TabsContent>
					<TabsContent value="a-vencer">
						<ListTable
							onRowClick={handleOnEdit}
							wrapperClassName="border border-b-0 rounded-t-md"
							footerWrapperProps={{
								className: "border border-t-0 rounded-b-md",
							}}
							tableColumns={tableColumns}
							rows={faturasAVencer || []}
						/>
					</TabsContent>
				</Tabs>
			</section>
			<UpsertInvoiceSheet onSuccess={handleClose} onClose={handleClose} />
		</>
	);
};
