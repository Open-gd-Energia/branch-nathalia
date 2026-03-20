export interface BillingType {
	id: number;
	nome: string;
	descricao?: string;
	referencia: string;
	valor?: number;
}

export const billingTypeReferenceOptions = {
	"energia-compensada": "Energia Compensada",
	"energia-injetada": "Energia Injetada",
	"valor-fixo": "Valor Fixo",
};
