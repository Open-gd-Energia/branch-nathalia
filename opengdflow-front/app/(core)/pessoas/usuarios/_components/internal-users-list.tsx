"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/redux";
import type { User } from "@/lib/models/user";
import {
	ListTable,
	type TableColumns,
} from "../../../_components/list-screen/table";
import { deleteInternalUser } from "../_services/delete";
import { fetchInternalUsers } from "../_services/fetch";

const tableColumns = [
	{
		key: "nome",
		label: "Nome do usuário",
		cellProps: { className: "max-w-[200px]" },
	},
	{
		key: "email",
		label: "E-mail",
	},
	{
		key: "perfil",
		label: "Perfil de acesso",
		render: (row) => <Badge>{row?.perfil?.nome}</Badge>,
	},
	{
		key: "status",
		label: "Status",
		render: (row) => <Badge>{row?.status === 1 ? "Ativo" : "Inativo"}</Badge>,
	},
] as TableColumns<User>[];

export interface InternalUsersListProps {
	data: User[];
}

export const InternalUsersList: FC<InternalUsersListProps> = ({
	data: internalUsersList,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.internalUser.sheet.open);
	const { data, refetch } = useQuery({
		queryKey: ["internal-users-list"],
		queryFn: async () =>
			fetchInternalUsers(searchParams.get("search") ?? undefined),
		initialData: internalUsersList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteInternalUser(id),
		onSuccess: () => {
			toast.success("Usuário excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteInternalUser]:", error);
			toast.error("Erro ao excluir usuário!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/pessoas/usuarios/${id}`);
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
