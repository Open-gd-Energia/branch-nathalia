"use client";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { fetchCobranca } from "@/app/(core)/cobrancas/_services/fetch";
import { useAppSelector } from "@/hooks/redux";
import type { Cobranca } from "@/lib/models/cobranca";
import type { Usina } from "@/lib/models/usina";
import { clearCobrancaPagarFilters } from "@/lib/redux/features/cobrancas/slice";
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
	// 	render: (_row) => _row?.ex
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
] as TableColumns<Cobranca>[];

export const UsinaOrdensPagamentoList: FC<UsinaOrdensPagamentoListProps> = ({
	usina,
}) => {
	const _router = useRouter();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const filters = useAppSelector((state) => state.cobrancas.filters);
	const { data, refetch } = useQuery({
		queryKey: ["usina-cobrancas", usina?.id],
		queryFn: () =>
			fetchCobranca({
				...filters,
				identificador: searchParams.get("search"),
				tipo: "PAGAR",
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

	if (!usina) return <div>Usina não encontrada</div>;

	return <ListTable tableColumns={tableColumns} rows={data || []} />;
};
