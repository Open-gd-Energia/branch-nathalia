"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/redux";
import type { DiscountTypes } from "@/lib/models/discount-types";
import {
	ListTable,
	type TableColumns,
} from "../../../_components/list-screen/table";
import { deleteDiscountTypes } from "../_services/delete";
import { fetchDiscountTypes } from "../_services/fetch";

const tableColumns = [
	{
		key: "nome",
		label: "Nome do tipo de desconto",
	},
	{
		key: "descricao",
		label: "Descrição",
		cellProps: { className: "max-w-[200px]" },
	},
] as TableColumns<DiscountTypes>[];

export interface DiscountTypesListProps {
	data: DiscountTypes[];
}

export const DisctounTypesList: FC<DiscountTypesListProps> = ({
	data: discountTypesList,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.discountTypes.sheet.open);
	const { data, refetch } = useQuery({
		queryKey: ["discount-types-list"],
		queryFn: async () =>
			fetchDiscountTypes(searchParams.get("search") ?? undefined),
		initialData: discountTypesList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteDiscountTypes(id),
		onSuccess: () => {
			toast.success("Tipo de desconto excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteDiscountTypes]:", error);
			toast.error("Erro ao excluir tipo de desconto!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/config/tipos-desconto/${id}`);
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
