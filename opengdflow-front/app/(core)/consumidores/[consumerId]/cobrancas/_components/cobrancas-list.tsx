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
import { UpsertCobrancaSheet } from "@/app/(core)/cobrancas/_components/upsert-cobranca";
import { fetchCobranca } from "@/app/(core)/cobrancas/_services/fetch";
import { fetchCobrancaById } from "@/app/(core)/cobrancas/_services/fetch-by-id";
import { useAppSelector } from "@/hooks/redux";
import type { Cobranca } from "@/lib/models/cobranca";
import type { Consumer } from "@/lib/models/consumer";
import {
	cleanCobrancaPagarData,
	clearCobrancaPagarFilters,
	setCobrancaPagarData,
	toggleOpenCobrancasPagarSheet,
} from "@/lib/redux/features/cobrancas/slice";

export interface ConsumidorCobrancasListProps {
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
] as TableColumns<Cobranca>[];

export const ConsumidorCobrancasList: FC<ConsumidorCobrancasListProps> = ({
	consumer,
}) => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const filters = useAppSelector((state) => state.cobrancas.filters);
	const { data, refetch } = useQuery({
		queryKey: ["cobrancas", "consumer", consumer?.id],
		queryFn: () =>
			fetchCobranca({
				...filters,
				identificador: searchParams.get("search"),
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

	useEffect(() => {
		return () => {
			dispatch(cleanCobrancaPagarData());
			dispatch(toggleOpenCobrancasPagarSheet(false));
		};
	}, []);

	if (!consumer) return <div>Consumidor não encontrado</div>;

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const cobranca = await fetchCobrancaById(id);
			if (!cobranca) {
				toast.error("Cobrança não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setCobrancaPagarData(cobranca));
			// 3. open form
			dispatch(toggleOpenCobrancasPagarSheet(true));
		} catch (error) {
			toast.error("Erro ao editar cobrança!");
			console.error("[handleOnEdit]:", error);
		}
	};

	const handleClose = () => {
		dispatch(cleanCobrancaPagarData());
		dispatch(toggleOpenCobrancasPagarSheet(false));
	};

	return (
		<>
			<ListTable
				tableColumns={tableColumns}
				rows={data || []}
				onRowClick={(id) => handleOnEdit(id)}
			/>
			<UpsertCobrancaSheet onSuccess={handleClose} onClose={handleClose} />
		</>
	);
};
