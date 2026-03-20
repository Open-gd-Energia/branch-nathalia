import { fetcher } from "@/lib/fetcher";
import type { Documento, DocumentoRequest } from "@/lib/models/documento";

export type UpsertDocument = DocumentoRequest & {
	id?: number;
	base64: string;
};

export const upsertDocument = async (
	data: UpsertDocument,
): Promise<Documento> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/documentos/${data.id}` : "/documentos";

		const res = await fetcher<Documento>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertDocumento]:", error);
		throw error;
	}
};
