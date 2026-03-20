"use client";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { useAppSelector } from "@/hooks/redux";
import type { Previsao } from "@/lib/models/previsao";
import type { Usina } from "@/lib/models/usina";
import {
	clearPrevisaoFilters,
	setPrevisaoData,
	toggleOpenPrevisaoSheet,
} from "@/lib/redux/features/previsao/slice";
import { localeNumberFormat } from "@/lib/utils";
import { fetchPrevisao } from "../_services/fetch";
import { fetchPrevisaoById } from "../_services/fetch-by-id";

export interface UsinaPrevisaoListProps {
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
		key: "geracaoPrevista",
		label: "Geração prevista (kW)",
		render: (row) => localeNumberFormat(row?.geracaoPrevista),
	},
	{
		key: "consumoPrevisto",
		label: "Consumo previsto (kW)",
		render: (row) => localeNumberFormat(row?.consumoPrevisto),
	},
	{
		key: "geracaoMediaPrevista",
		label: "Geração média prevista (kW)",
		render: (row) => localeNumberFormat(row?.geracaoMediaPrevista),
	},
	{
		key: "consumoMedioPrevisto",
		label: "Consumo médio prevista (kW)",
		render: (row) => localeNumberFormat(row?.consumoMedioPrevisto),
	},
] as TableColumns<Previsao>[];

export const UsinaPrevisaoList: FC<UsinaPrevisaoListProps> = ({ usina }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const sheetOpen = useAppSelector((state) => state.previsao.sheet.open);
	const { data, refetch } = useQuery({
		queryKey: ["usina-previsao", usina?.id],
		queryFn: () =>
			fetchPrevisao({
				idUsina: usina?.id?.toString(),
			}),
	});

	useEffect(() => {
		refetch();
	}, [searchParams]);

	useEffect(() => {
		return () => {
			dispatch(clearPrevisaoFilters());
		};
	}, [searchParams]);

	useEffect(() => {
		if (!sheetOpen) {
			refetch();
		}
	}, [sheetOpen]);

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const invoice = await fetchPrevisaoById(id);
			if (!invoice) {
				toast.error("Fatura não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setPrevisaoData(invoice));
			// 3. open form
			dispatch(toggleOpenPrevisaoSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de previsao!");
			console.error("[handleOnEdit]:", error);
			router.back();
		}
	};

	if (!usina) return <div>Usina não encontrada</div>;

	return (
		<ListTable
			tableColumns={tableColumns}
			rows={data || []}
			onEdit={handleOnEdit}
		/>
	);
};
