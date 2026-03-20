export interface ViaCEPResponseData {
	erro: string;
	cep: string;
	logradouro: string;
	numero: string;
	bairro: string;
	complemento: string;
	localidade: string;
	uf: string;
	ibge: string;
}

export interface FetchByCepResponseData extends ViaCEPResponseData {}

export const fetchByCep = async (
	cep: string,
): Promise<FetchByCepResponseData> => {
	try {
		const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

		const contentType = res.headers.get("content-type");
		const data: ViaCEPResponseData = contentType?.includes("application/json")
			? await res.json()
			: await res.text();

		if (!res.ok) {
			throw new Error("Ocorreu um erro ao buscar o cep");
		}

		if (data?.erro === "true") throw new Error("CEP não encontrado");

		return data;
	} catch (error) {
		console.error("[fetchByCep]:", error);
		throw error;
	}
};
