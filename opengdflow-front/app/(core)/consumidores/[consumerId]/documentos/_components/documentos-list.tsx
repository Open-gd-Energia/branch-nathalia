"use client";
import { useMutation } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FC, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
	ListTable,
	type TableColumns,
} from "@/app/(core)/_components/list-screen/table";
import { Button } from "@/components/ui/button";
import type { Documento } from "@/lib/models/documento";
import { deleteDocument } from "@/lib/services/documents/delete";
import { fetchDocumentById } from "@/lib/services/documents/fetch-by-id";
import { downloadDocument } from "@/lib/utils";

export interface ConsumidorDocumentosListProps {
	documentsList: Documento[];
	refetch?: () => void;
}

const tableColumns = [
	{
		key: "nome",
		cellProps: { className: "max-w-1/2" },
		label: "Nome do arquivo",
	},
	{
		key: "tamanho",
		label: "Tamanho",
		render: (row) => `${(row?.tamanho ?? 0) / 1000}kb`,
	},
	{
		key: "download",
		label: "",
		cellProps: { className: "w-8" },
		render: (row) => {
			const handleClick = async () => {
				try {
					if (!row?.id) throw new Error("id não encontrado");
					const doc = await fetchDocumentById(row?.id);
					if (!doc) throw new Error("Documento nao encontrado");
					downloadDocument(doc);
				} catch (error) {
					console.error("[handleClick]:", row?.id, error);
				}
			};
			return (
				<Button onClick={handleClick} size="icon" variant="ghost">
					<Download />
				</Button>
			);
		},
	},
] as TableColumns<Documento>[];

export const ConsumidorDocumentosList: FC<ConsumidorDocumentosListProps> = ({
	documentsList,
	refetch,
}) => {
	const searchParams = useSearchParams();

	const { mutateAsync } = useMutation({
		mutationFn: deleteDocument,
		onSuccess: () => {
			refetch?.();
			toast.success("Documento removido com sucesso!");
		},
		onError: (e) => {
			toast.error("Erro ao remover documento!", {
				description: e?.message ?? "",
			});
		},
	});

	useEffect(() => {
		refetch?.();
	}, [searchParams]);

	const handleDelete = useCallback(async (id: string | number) => {
		await mutateAsync(id);
	}, []);

	return (
		<ListTable
			tableColumns={tableColumns}
			rows={documentsList || []}
			onDelete={handleDelete}
		/>
	);
};
