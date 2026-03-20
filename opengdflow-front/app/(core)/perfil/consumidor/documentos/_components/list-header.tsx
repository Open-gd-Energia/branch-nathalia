"use client";

import { useMutation } from "@tanstack/react-query";
import { Paperclip } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import { SearchInput } from "@/app/(core)/_components/list-screen/search-input";
import {
	FileUploadButton,
	type ProcessedFile,
} from "@/components/file-upload-button";
import { Button } from "@/components/ui/button";
import type { Consumer } from "@/lib/models/consumer";
import type { Documento } from "@/lib/models/documento";
import { fetchDocuments } from "@/lib/services/documents/fetch";
import { upsertDocument } from "@/lib/services/documents/upsert";

export interface ListHeaderProps {
	consumer: Consumer | null;
	afterFileUpload?: () => void;
}

export const ListHeader = ({ consumer, afterFileUpload }: ListHeaderProps) => {
	const handleOnSearch = useCallback(async (nome: string) => {
		return await fetchDocuments({
			queryParams: { nome, idConsumidor: consumer?.id?.toString() },
		});
	}, []);
	const { mutateAsync: handleUploadDocument } = useMutation({
		mutationFn: async (files: ProcessedFile[]) => {
			const uploadedDocuments: Documento[] = [];
			for (const _file of files) {
				const file = {
					tamanho: _file.size,
					tipo: _file.type,
					nome: _file.name,
					..._file,
				};
				const data = await upsertDocument({
					consumidor: {
						id: consumer?.id,
					},
					...file,
				});
				uploadedDocuments.push(data);
			}
			return uploadedDocuments;
		},
		onSuccess: () => {
			toast.success("Documentos adicionados com sucesso!");
			afterFileUpload?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar documento!", {
				description: e?.message ?? "",
			});
		},
	});

	return (
		<div className="flex w-full justify-between gap-2">
			<SearchInput placeholder="Nome do documento" onSearch={handleOnSearch} />
			<FileUploadButton onUpload={handleUploadDocument}>
				<Button size="sm">
					<Paperclip />
					Anexar
				</Button>
			</FileUploadButton>
		</div>
	);
};
