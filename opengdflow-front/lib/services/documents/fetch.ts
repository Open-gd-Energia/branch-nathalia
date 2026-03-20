import { fetcher } from "@/lib/fetcher";
import type { Documento } from "@/lib/models/documento";

export interface FetchDocumentsParams {
	queryParams?: {
		idUsuario?: string;
		idUsina?: string;
		idRepresentante?: string;
		idConsumidor?: string;
		dataInicial?: string;
		dataFinal?: string;
		tipo?: string;
		status?: string;
		descricao?: string;
		nome?: string;
	};
}

export const fetchDocuments = async ({
	queryParams: _queryParams,
}: FetchDocumentsParams): Promise<Documento[]> => {
	try {
		const queryParams = new URLSearchParams(_queryParams);

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Documento[]>(`/documentos${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchDocuments]:", error);
		return [];
	}
};
