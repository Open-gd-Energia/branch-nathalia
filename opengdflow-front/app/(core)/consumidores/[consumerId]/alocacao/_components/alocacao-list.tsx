"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { UpsertAlocacaoSheet } from "@/app/(core)/alocacao/_components/upsert-alocacao";
import { fetchAlocacaoItems } from "@/app/(core)/alocacao/_services/fetch-alocacao-item";
import { fetchAlocacaoById } from "@/app/(core)/alocacao/_services/fetch-by-id";
import { RoundPercentage } from "@/components/round-percentage";
import { useAppSelector } from "@/hooks/redux";
import type { AlocacaoItem } from "@/lib/models/alocacao";
import type { Consumer } from "@/lib/models/consumer";
import {
	cleanAlocacaoData,
	clearAlocacaoFilters,
	setAlocacaoData,
	toggleOpenAlocacaoSheet,
} from "@/lib/redux/features/alocacao/slice";

export interface ConsumidorAlocacaoListProps {
	consumer: Consumer | null;
}

const tableColumns = [
	{
		key: "alocacao.usina.nome",
		cellProps: { className: "max-w-[150px]" },
		label: "Nome da usina",
	},
	{
		key: "alocacao.usina.uc",
		label: "UC",
	},
	{
		key: "alocacao.status",
		label: "Status",
		badge: true,
	},
	{
		key: "alocacaoTotal",
		label: "Alocação",
		render: (row) => {
			const quota = row?.quota;
			return quota ? (
				<div className="flex gap-1 items-center">
					<RoundPercentage percentage={quota} />
					{Intl.NumberFormat("pt-BR", {
						style: "percent",
						maximumFractionDigits: 2,
					}).format(quota / 100)}
				</div>
			) : (
				"-"
			);
		},
	},
] as TableColumns<AlocacaoItem>[];

export const ConsumidorAlocacaoList: FC<ConsumidorAlocacaoListProps> = ({
	consumer,
}) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const filters = useAppSelector((state) => state.alocacao.alocacaoItemFilters);
	const { data } = useQuery({
		queryKey: [
			"consumer-alocacao",
			consumer?.id,
			filters,
			searchParams?.get("search"),
		],
		queryFn: async () => {
			const alocacoes = await fetchAlocacaoItems({
				...filters,
				idConsumidor: consumer?.id,
			});
			return alocacoes;
		},
	});

	useEffect(() => {
		return () => {
			dispatch(clearAlocacaoFilters());
		};
	}, [searchParams]);

	useEffect(() => {
		return () => {
			dispatch(cleanAlocacaoData());
			dispatch(toggleOpenAlocacaoSheet(false));
		};
	}, []);

	if (!consumer) return <div>Consumidor não encontrado</div>;

	const handleOnEdit = async (id?: string | number) => {
		try {
			if (!id) throw new Error("id nao encontrado");
			// 1. fetch by id
			const alocacao = await fetchAlocacaoById(id);
			if (!alocacao) {
				toast.error("Alocação não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setAlocacaoData(alocacao));
			// 3. open form
			dispatch(toggleOpenAlocacaoSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de alocação!");
			console.error("[handleOnEdit]:", error);
			router.back();
		}
	};

	const handleClose = () => {
		dispatch(cleanAlocacaoData());
		dispatch(toggleOpenAlocacaoSheet(false));
	};

	return (
		<>
			<ListTable
				tableColumns={tableColumns}
				rows={data || []}
				onRowClickRowInfo={(row) => handleOnEdit(row?.alocacao?.id)}
			/>
			<UpsertAlocacaoSheet onSuccess={handleClose} onClose={handleClose} />
		</>
	);
};
