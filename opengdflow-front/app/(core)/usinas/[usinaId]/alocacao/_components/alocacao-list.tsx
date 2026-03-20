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
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/redux";
import {
	type AlocacaoItem,
	alocacaoStatusOptions,
} from "@/lib/models/alocacao";
import type { Usina } from "@/lib/models/usina";
import {
	cleanAlocacaoData,
	clearAlocacaoFilters,
	setAlocacaoData,
	toggleOpenAlocacaoSheet,
} from "@/lib/redux/features/alocacao/slice";

export interface UsinaAlocacaoListProps {
	usina: Usina | null;
}

const tableColumns = [
	{
		key: "consumidor.nome",
		cellProps: { className: "max-w-[150px]" },
		label: "Consumidor",
	},
	{
		key: "consumidor.uc",
		label: "UC",
	},
	{
		key: "alocacao.status",
		label: "Status",
		render(row) {
			const status = row?.alocacao?.status;
			if (!status) return "-";
			return (
				<Badge>
					{alocacaoStatusOptions[status as keyof typeof alocacaoStatusOptions]}
				</Badge>
			);
		},
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

export const UsinaAlocacaoList: FC<UsinaAlocacaoListProps> = ({ usina }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const filters = useAppSelector((state) => state.alocacao.alocacaoItemFilters);
	const { data } = useQuery({
		queryKey: [
			"usina-alocacao",
			usina?.id,
			filters,
			searchParams?.get("search"),
		],
		queryFn: () =>
			fetchAlocacaoItems({
				...filters,
				idUsina: usina?.id,
			}),
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

	if (!usina) return <div>Usina não encontrada</div>;

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
