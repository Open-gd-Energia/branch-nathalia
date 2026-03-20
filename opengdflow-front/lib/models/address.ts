export interface Endereco {
	id: number;
	cidade: Cidade;
	endereco: null;
	numero: string;
	complemento: string;
	latitude: null;
	longitude: null;
	cep: string;
	bairro: string;
}

export interface Cidade {
	id: number;
	nome: string;
	uf: string;
}
