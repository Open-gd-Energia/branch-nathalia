import type { API } from "../types/api";

type UsinaApi = API["schemas"]["UsinaResponse"];
type UsinaApiRequest = API["schemas"]["UsinaRequest"];
type ContaApi = API["schemas"]["ContaResponse"];
type BancoApi = API["schemas"]["BancoResponse"];

export interface Usina extends Omit<UsinaApi, "id"> {
	id: string | number;
	nome: string;
}

export interface UsinaRequest extends Omit<UsinaApiRequest, "id"> {
	id?: string | number;
}

export interface Conta extends ContaApi {}

export interface Banco extends BancoApi {}

export const usinaTensaoConexaoOptions = {
	ALTA_TENSAO: "Alta Tensão",
	BAIXA_TENSAO: "Baixa Tensão",
};

export const usinaTipoConexaoOptions = {
	MONOFASICO: "Monofásico",
	BIFASICO: "Bifásico",
	TRIFASICO: "Trifásico",
};

export const usinaClassificacaoOptions = {
	B1_RESIDENCIAL: "B1 Residencial",
	B2_RURAL: "B2 Rural",
	B3_INDUSTRIAL_COMERCIAL: "B3 Industrial/Comercial",
	A4: "A4 (2.3 25kV)",
	A3A: "A3a (30 a 44kV)",
};

export const usinaStatusesOptions = {
	ATIVO: "Ativo",
	INATIVO: "Inativo",
	EM_NEGOCIACAO: "Em Negociação",
	TROCANDO_TITULARIDADE: "Trocando Titularidade",
};
