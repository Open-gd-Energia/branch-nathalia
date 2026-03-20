import type { API } from "../types/api";

type TituloApiResponse = API["schemas"]["TituloResponse"];
type TituloApiRequest = API["schemas"]["TituloRequest"];

export interface Cobranca extends TituloApiResponse {}
export interface CobrancaRequest extends TituloApiRequest {
	id?: string | number;
}

export const cobrancaStatuses = {
	AGUARDANDO_FATURA: "Aguardando Fatura",
	FATURANDO: "Faturando",
	EM_ABERTO: "Em Aberto",
	PAGO: "Pago",
	VENCIDO: "Vencido",
	NAO_FATURADO: "Nao Faturado",
	CANCELADO: "Cancelado",
	RASCUNHO: "Rascunho",
} as const;

export type CobrancaStatus = keyof typeof cobrancaStatuses;
