import type { API } from "../types/api";

type FaturaResponseAPI = API["schemas"]["FaturaResponse"];

export interface Invoice extends Omit<FaturaResponseAPI, "id"> {
	id: number;
}

export type InvoiceRequest = API["schemas"]["FaturaRequest"] & { id?: number };

export const invoiceStatusOptions = {
	PROCESSADA: "Processada",
	EM_PROCESSAMENTO: "Em processamento",
	ERRO: "Erro",
} as const;
