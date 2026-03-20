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
import type { Usina } from "@/lib/models/usina";
import {
	cleanCobrancaPagarData,
	clearCobrancaPagarFilters,
	setCobrancaPagarData,
	toggleOpenCobrancasPagarSheet,
} from "@/lib/redux/features/cobrancas/slice";
import { localeCurrencyFormat, localeNumberFormat } from "@/lib/utils";

export interface UsinaOrdensPagamentoListProps {
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
			row?.dataVencimento
				? format(parseISO(row?.dataVencimento), "dd/MM/yyyy", { locale: ptBR })
				: "",
	},
	{
		key: "energiaInjetada",
		label: "Energia injetada",
		cellProps: { className: "max-w-[100px]" },
		render: (row) => localeNumberFormat(row?.energiaInjetada),
	},
	{
		key: "energiaCompensada",
		label: "Energia compensada",
		cellProps: { className: "max-w-[100px]" },
		render: (row) => localeNumberFormat(row?.energiaCompensada),
	},
	// {
	// 	key: "excedente",
	// 	label: "Excedente de energia",
	// 	cellProps: { className: "max-w-[100px]" },
	// 	// FIXME: Get it from?
	// 	render: (_row) => _row?.e,
	// },
	{
		key: "valorTotal",
		label: "Valor total",
		render: (row) => localeCurrencyFormat(row?.valorTotal),
	},
	{
		key: "status",
		label: "Status",
		badge: true,
	},
	// FIXME: Dowload cobranca
	// {
	// 	key: "generatePdf",
	// 	label: "",
	// 	render: (_row) => {
	// 		return <FileText />;
	// 	},
	// },
] as TableColumns<Cobranca>[];

export const UsinaOrdensPagamentoList: FC<UsinaOrdensPagamentoListProps> = ({
	usina,
}) => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const filters = useAppSelector((state) => state.cobrancas.filters);
	const { data, refetch } = useQuery({
		queryKey: ["usina-cobrancas", usina?.id],
		queryFn: () =>
			fetchCobranca({
				...filters,
				identificador: searchParams.get("search"),
				idUsina: usina?.id,
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

	if (!usina) return <div>Usina não encontrada</div>;

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
