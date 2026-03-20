import type { API } from "../types/api";

type TipoDescontoApi = API["schemas"]["TipoDescontoResponse"];

type TipoDescontoItemApi = API["schemas"]["TipoDescontoItemResponse"];

export interface DiscountTypes extends TipoDescontoApi {}

export interface DiscountItemTypes extends TipoDescontoItemApi {}

export const economySubtractedOptions = {
	VALOR_ENERGIA_COMPENSADA: "Valor de Energia Compensada",
	VALOR_ENERGIA_COMPENSADA_BANDEIRA:
		"Valor de Energia Compensada + Bandeira Tarifária",
	VALOR_ENERGIA_COM_IMPOSTOS: "Valor de Energia com Impostos",
	VALOR_ENERGIA_SEM_IMPOSTOS: "Valor de Energia sem Impostos",
	TOTAL_COPEL: "Valor Total da Fatura Copel",
};

export const discountApplicationOptions = {
	TARIFA_SEM_IMPOSTOS: "Tarifa sem impostos",
	TARIFA_COMPENSADA: "Tarifa compensada",
	TARIFA_COMPENSADA_BANDEIRA: "Tarifa Compensada + Bandeira Tarifária",
	TARIFA_COM_IMPOSTOS: "Tarifa com impostos",
	FATURA_COPEL: "Fatura Copel",
	VALOR_FIXO: "Valor Fixo",
};

export const toBeChargedOptions = {
	ENERGIA_COMPENSADA: "Energia Compensada",
	ENERGIA_INJETADA: "Energia Injetada",
	VALOR_FIXO: "Valor Fixo",
};
