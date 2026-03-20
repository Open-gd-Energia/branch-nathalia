export interface IBGEUF {
	id: number;
	sigla: string;
	nome: string;
	regiao?: IBGEUF;
}

export interface IBGECity {
	id: number;
	nome: string;
	microrregiao: Microrregiao;
	"regiao-imediata": RegiaoImediata;
}

export interface Microrregiao {
	id: number;
	nome: string;
	mesorregiao: Mesorregiao;
}

export interface Mesorregiao {
	id: number;
	nome: string;
	UF: IBGEUF;
}

export interface RegiaoImediata {
	id: number;
	nome: string;
	"regiao-intermediaria": Mesorregiao;
}
