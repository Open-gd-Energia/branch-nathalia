"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/redux";
import type { TariffRules } from "@/lib/models/tariff-rules";
import {
	ListTable,
	type TableColumns,
} from "../../../_components/list-screen/table";
import { deleteTariffRules } from "../_services/delete";
import { fetchTariffRules } from "../_services/fetch";

const tableColumns = [
	{ key: "nome", label: "Nome da regra" },
	{
		key: "descricao",
		label: "Descrição",
		cellProps: { className: "max-w-[200px]" },
	},
	{
		key: "valor",
		label: "Valor tarifário (R$/kWh)",
	},
] as TableColumns<TariffRules>[];

export interface TariffRulesListProps {
	data: TariffRules[];
}

export const TariffRulesList: FC<TariffRulesListProps> = ({
	data: tariffRulesList,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.tariffRules.sheet.open);
	const { data, refetch } = useQuery({
		queryKey: ["tariffRulesList"],
		queryFn: async () =>
			fetchTariffRules(searchParams.get("search") ?? undefined),
		initialData: tariffRulesList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteTariffRules(id),
		onSuccess: () => {
			toast.success("Regra tarifária excluída com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteTariffRules]:", error);
			toast.error("Erro ao excluir regra tarifária!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/config/regras-tarifarias/${id}`);
	};

	useEffect(() => {
		if (!formOpen) {
			refetch();
		}
	}, [formOpen, refetch]);

	return (
		<ListTable
			tableColumns={tableColumns}
			rows={data}
			onDelete={(id) => mutateAsync(id)}
			onEdit={handleOnEdit}
		/>
	);
};
