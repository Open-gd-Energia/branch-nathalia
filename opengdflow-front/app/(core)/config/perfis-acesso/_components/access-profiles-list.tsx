"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/redux";
import type { AccessProfile } from "@/lib/models/access-profiles";
import {
	ListTable,
	type TableColumns,
} from "../../../_components/list-screen/table";
import { deleteAccessProfile } from "../_services/delete";
import { fetchAccessProfiles } from "../_services/fetch";

const tableColumns = [
	{ key: "nome", label: "Nome do perfil" },
	{
		key: "descricao",
		label: "Descrição",
		cellProps: { className: "max-w-[200px]" },
	},
	{
		key: "permissoes",
		label: "Tipo de perfil",
		cellProps: { className: "max-w-[200px]" },
		render: (row) => (
			<div className="flex gap-1">
				{row?.permissoes?.map((permission) => (
					<Badge key={permission.id}>{permission?.nome}</Badge>
				))}
			</div>
		),
	},
] as TableColumns<AccessProfile>[];

export interface AccessProfilesListProps {
	data: AccessProfile[];
}

export const AccessProfilesList: FC<AccessProfilesListProps> = ({
	data: accessProfilesList,
}) => {
	const router = useRouter();
	const formOpen = useAppSelector((state) => state.accessProfiles.sheet.open);
	const { data, refetch } = useQuery({
		queryKey: ["access-profiles-list"],
		queryFn: async () => fetchAccessProfiles(),
		initialData: accessProfilesList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteAccessProfile(id),
		onSuccess: () => {
			toast.success("Perfile de acesso excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteAccessProfiles]:", error);
			toast.error("Erro ao excluir perfile de acesso!", {
				description: error.message,
			});
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/config/perfis-acesso/${id}`);
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
