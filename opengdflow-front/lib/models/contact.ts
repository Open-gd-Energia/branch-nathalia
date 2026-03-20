import type { API } from "../types/api";

type RepresentanteApiType = API["schemas"]["RepresentanteResponse"];
type RepresentanteRequestApiType = API["schemas"]["RepresentanteRequest"];

export interface Contact extends RepresentanteApiType {}
export interface ContactRequest extends RepresentanteRequestApiType {}

export const tipoPessoaOptions = {
	PESSOA_FISICA: "Pessoa Física",
	PESSOA_JURIDICA: "Pessoa Jurídica",
	GESTORA: "Gestora",
} as const;

export const representanteRelations = {
	CONTATO: "Contato",
	OPERADOR: "Operador",
	TESTEMUNHA: "Testemunha",
	RESPONSAVEL_LEGAL: "Responsável Legal",
	SOCIO: "Sócio",
	SOCIO_ADMINISTRADOR: "Sócio Administrador",
	COMISSIONADO: "Comissionado",
	GESTORA: "Gestora",
} as const;
