import type { API } from "../types/api";

type AlocacaoAPIRequest = API["schemas"]["AlocacaoRequest"];
type AlocacaoAPIResponse = API["schemas"]["AlocacaoResponse"];
type AlocacaoItemAPIRequest = API["schemas"]["AlocacaoItemRequest"];
type AlocacaoItemAPIReposonse = API["schemas"]["AlocacaoItemResponse"];

export interface Alocacao extends AlocacaoAPIResponse {}
export interface AlocacaoRequest extends AlocacaoAPIRequest {
	id?: number | string;
}

export interface AlocacaoItem extends AlocacaoItemAPIReposonse {}
export interface AlocacaoItemRequest extends AlocacaoItemAPIRequest {}

export const alocacaoStatusOptions = {
	ATIVO: "Ativo",
	INATIVO: "Inativo",
	AGUARDANDO_PROTOCOLO: "Aguardando Protocolo",
	SENDO_SUBSTITUIDO: "Sendo Substituído",
};
