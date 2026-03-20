import { fetcher } from "@/lib/fetcher";
import type { DocumentoArquivo } from "@/lib/models/documento";

export const fetchDocumentById = async (
	id: string | number,
): Promise<DocumentoArquivo | null> => {
	try {
		if (!id) return null;
		const response = await fetcher<DocumentoArquivo>(`/documentos/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchDocumentById]:", error);
		return null;
	}
};
