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
import { useAppSelector } from "@/hooks/redux";
import type { Geracao } from "@/lib/models/geracao";
import type { Usina } from "@/lib/models/usina";
import { clearGeracaoFilters } from "@/lib/redux/features/geracao/slice";
import { localeNumberFormat } from "@/lib/utils";
import { fetchGeracao } from "../_services/fetch";

export interface UsinaGeracaoListProps {
	usina: Usina | null;
}

const tableColumns = [
	{
		key: "mesReferencia",
		label: "Mês de referência",
		render: (row) => {
			return row?.mesReferencia
				? format(parseISO(row?.mesReferencia), "MMM/yyyy", {
						locale: ptBR,
					}).toUpperCase()
				: "-";
		},
	},
	{
		key: "consumoInformado",
		label: "Consumo informado (kW)",
		render: (row) => localeNumberFormat(row?.valorConsumoInformado),
	},
	{
		key: "geracaoInformado",
		label: "Geração informada (kW)",
		render: (row) => localeNumberFormat(row?.valorGeracaoInformado),
	},
	{
		key: "creditoDistribuidos",
		label: "Créditos distribuídos (kW)",
		render: (row) => localeNumberFormat(row?.valorCreditoDistribuido),
	},
	{
		key: "valorEnergiaCompensada",
		label: "Energia compensada (kW)",
		render: (row) => localeNumberFormat(row?.valorEnergiaCompensada),
	},
] as TableColumns<Geracao>[];

export const UsinaGeracaoList: FC<UsinaGeracaoListProps> = ({ usina }) => {
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const sheetOpen = useAppSelector((state) => state.geracao.sheet.open);
	const { data, refetch } = useQuery({
		queryKey: ["usina-geracao", usina?.id],
		queryFn: () =>
			fetchGeracao({
				idUsina: usina?.id?.toString(),
			}),
	});

	useEffect(() => {
		refetch();
	}, [searchParams]);

	useEffect(() => {
		return () => {
			dispatch(clearGeracaoFilters());
		};
	}, [searchParams]);

	useEffect(() => {
		if (!sheetOpen) {
			refetch();
		}
	}, [sheetOpen]);

	if (!usina) return <div>Usina não encontrada</div>;

	return <ListTable tableColumns={tableColumns} rows={data || []} />;
};
