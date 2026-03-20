import type { API } from "../types/api";

type ConsumidorResponseApi = API["schemas"]["ConsumidorResponse"];
type ConsumidorRequestApi = API["schemas"]["ConsumidorRequest"];

export interface ConsumerRequest extends ConsumidorRequestApi {
	id?: string | number;
}
export interface Consumer extends ConsumidorResponseApi {
	id: number;
	nome: string;
}

export const consumerClassifications = {
	B1_RESIDENCIAL: "B1 Residencial",
	B2_RURAL: "B2 Rural",
	B3_COMERCIAL: "B3 Comercial",
} as const;

export type ConsumerClassificationType = keyof typeof consumerClassifications;

export const consumerTypes = {
	AUTOCONSUMO: "Autoconsumo",
	GERACAO_COMPARTILHADA: "Geração Compartilhada",
} as const;

export const consumerStatuses = {
	ATIVO: "Ativo",
	INATIVO: "Inativo",
	AGUARDANDO_COMPENSACAO: "Aguardando Compensação",
	AGUARDANDO_DOCUMENTOS: "Aguardando Documentos",
	AGUARDANDO_GERADOR: "Aguardando Gerador",
	PROTOCOLADO: "Protocolado",
	ESGOTANDO_CREDITOS: "Esgotando Créditos",
	EM_NEGOCIACAO: "Em Negociação",
} as const;
