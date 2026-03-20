"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/redux";
import type { Distribuitors } from "@/lib/models/distribuidora";
import {
	ListTable,
	type TableColumns,
} from "../../../_components/list-screen/table";
import { deleteDistribuitors } from "../_services/delete";
import { fetchDistribuitors } from "../_services/fetch";

const tableColumns = [
	{
		key: "nome",
		label: "Consumidor",
		cellProps: { className: "max-w-[200px]" },
	},
	{
		key: "sigla",
		label: "Sigla",
	},
	{
		key: "status",
		label: "Status",
		render: (row) => <Badge>{row?.status === 1 ? "Ativo" : "Inativo"}</Badge>,
	},
] as TableColumns<Distribuitors>[];

export interface DistribuitorsListProps {
	data: Distribuitors[];
}

export const DistribuitorsList: FC<DistribuitorsListProps> = ({
	data: distribuitosList,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.distribuitors.sheet.open);
	const { data, refetch } = useQuery({
		queryKey: ["distribuitorsList"],
		queryFn: async () =>
			fetchDistribuitors(searchParams.get("search") ?? undefined),
		initialData: distribuitosList,
	});
	const { mutateAsync: handleDelete } = useMutation({
		mutationFn: async (id: string | number) => deleteDistribuitors(id),
		onSuccess: () => {
			toast.success("Distribuidor excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteDistribuitors]:", error);
			toast.error("Erro ao excluir distribuidor!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/config/distribuidoras/${id}`);
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
			onDelete={(id) => handleDelete(id)}
			onEdit={handleOnEdit}
		/>
	);
};
