"use client";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { fetchCobranca } from "@/app/(core)/cobrancas/_services/fetch";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { Cobranca } from "@/lib/models/cobranca";
import type { Consumer } from "@/lib/models/consumer";
import { clearCobrancaPagarFilters } from "@/lib/redux/features/cobrancas/slice";

export interface ConsumidorCobrancasListProps {
	consumer: Consumer | null;
}

const tableColumns = [
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
				? format(parseISO(row?.dataVencimento), "dd/MM/yyyy", {
						locale: ptBR,
					})
				: "",
	},
	{
		key: "status",
		label: "Status",
		badge: true,
	},
	{
		key: "valorTotal",
		label: "Valor total",
		render: (row) =>
			row?.valorTotal?.toLocaleString("pt-BR", {
				style: "currency",
				currency: "BRL",
			}),
	},
	{
		key: "download",
		render: (_row) => (
			<Button
				size="icon"
				onClick={() => toast.error("Not implemented yet")}
				className="size-8"
				variant="outline"
			>
				<Download />
			</Button>
		),
	},
] as TableColumns<Cobranca>[];

export const ConsumidorCobrancasList: FC<ConsumidorCobrancasListProps> = ({
	consumer,
}) => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const filters = useAppSelector((state) => state.cobrancas.filters);
	const { data, refetch } = useQuery({
		queryKey: ["consumer-cobrancas", consumer?.id],
		queryFn: () =>
			fetchCobranca({
				...filters,
				identificador: searchParams.get("search"),
				tipo: "RECEBER",
				idConsumidor: consumer?.id,
			}),
	});

	useEffect(() => {
		refetch();
	}, [filters, searchParams]);

	useEffect(() => {
		return () => {
			dispatch(clearCobrancaPagarFilters());
		};
	}, [searchParams]);

	if (!consumer) return <div>Consumidor não encontrado</div>;

	return <ListTable tableColumns={tableColumns} rows={data || []} />;
};
