"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/redux";
import { type Contact, tipoPessoaOptions } from "@/lib/models/contact";
import { cn, formatCNPJ, formatCPF } from "@/lib/utils";
import {
	ListTable,
	type TableColumns,
} from "../../../_components/list-screen/table";
import { deleteContact } from "../_services/delete";
import { fetchContacts } from "../_services/fetch";

const tableColumns = [
	{
		key: "nome_razao_social",
		label: "Nome/Razão Social",
		cellProps: { className: "max-w-[200px]" },
		render: (row) =>
			row?.tipoPessoa === "PESSOA_FISICA"
				? row?.pessoaFisica?.nome
				: row?.pessoaJuridica?.razaoSocial,
	},
	{
		key: "cpf_cnpj",
		label: "CPF/CNPJ",
		render: (row) =>
			row?.tipoPessoa === "PESSOA_FISICA"
				? formatCPF(row?.pessoaFisica?.cpf ?? "")
				: formatCNPJ(row?.pessoaJuridica?.cnpj ?? ""),
	},
	{
		key: "telefone",
		label: "Telefone",
	},
	{
		key: "tipoPessoa",
		label: "Tipo de cliente",
		render: (row) => <TipoPessoaBadge tipoPessoa={row?.tipoPessoa ?? ""} />,
	},
] as TableColumns<Contact>[];

const TipoPessoaBadge: FC<{ tipoPessoa: string }> = ({ tipoPessoa }) => {
	const tipoPessoaStyles = {
		PESSOA_FISICA: "bg-yellow-200 text-foreground",
		PESSOA_JURIDICA: "bg-blue-600",
		GESTORA: "bg-green-500",
	};

	if (!tipoPessoa) return null;

	return (
		<Badge
			className={cn(
				tipoPessoaStyles[tipoPessoa as keyof typeof tipoPessoaStyles],
			)}
		>
			{tipoPessoaOptions[tipoPessoa as keyof typeof tipoPessoaOptions]}
		</Badge>
	);
};

export interface ContactsListProps {
	data: Contact[];
}

export const ContactsList: FC<ContactsListProps> = ({ data: contactsList }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formOpen = useAppSelector((state) => state.contact.sheet.open);
	const { data, refetch } = useQuery({
		queryKey: ["contacts-list"],
		refetchOnWindowFocus: false,
		queryFn: async () => fetchContacts(searchParams.get("search") ?? undefined),
		initialData: contactsList,
	});
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string | number) => deleteContact(id),
		onSuccess: () => {
			toast.success("Usuário excluído com sucesso!");
			refetch();
		},
		onError: (error) => {
			console.error("[deleteContact]:", error);
			toast.error("Erro ao excluir Contato!");
		},
	});

	const handleOnEdit = async (id: string | number) => {
		router.push(`/pessoas/contatos/${id}`);
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
