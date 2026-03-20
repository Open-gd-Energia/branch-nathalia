"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/redux";
import {
	type BillingType,
	billingTypeReferenceOptions,
} from "@/lib/models/billing-type";
import {
	ListTable,
	type TableColumns,
} from "../../../_components/list-screen/table";
import { deleteBillingType } from "../_services/delete";
import { fetchBillingType } from "../_services/fetch";

const tableColumns = [
	{ key: "nome", label: "Nome do tipo de faturamento" },
	{
		key: "descricao",
		label: "Descrição",
		cellProps: { className: "max-w-[200px]" },
	},
	{
		key: "referencia",
		label: "Referência de Faturamento (kWh)",
		render: (row: BillingType) => (
			<Badge>
				{billingTypeReferenceOptions[
					row?.referencia as keyof typeof billingTypeReferenceOptions
				] ?? row?.referencia}
			</Badge>
		),
	},
] as TableColumns<BillingType>[];

export interface BillingTypeListProps {
	data: BillingType[];
}

export const BillingTypeList: FC<BillingTypeListProps> = ({
	data: billingTypeList,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.billingType.sheet.open);
	const billingTypeFilters = useAppSelector(
		(state) => state.billingType.filters,
	);
	const search = searchParams.get("search") ?? undefined;

	const { data, refetch } = useQuery({
		queryKey: ["billingTypeList"],
		queryFn: async () => fetchBillingType(search, billingTypeFilters),
		initialData: billingTypeList,
	});

	const { mutateAsync } = useMutation({
		mutationFn: async (id: string) => deleteBillingType(id),
		onSuccess: () => {
			toast.success("Tipo de faturamento excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteBillingType]:", error);
			toast.error("Erro ao excluir tipo de faturamento!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/config/tipo-faturamento/${id}`);
	};

	useEffect(() => {
		if (!formOpen) {
			refetch();
		}
	}, [formOpen, refetch]);

	useEffect(() => {
		refetch();
	}, [billingTypeFilters]);

	return (
		<ListTable
			tableColumns={tableColumns}
			rows={data}
			onDelete={(id) => mutateAsync(id.toString())}
			onEdit={handleOnEdit}
		/>
	);
};
