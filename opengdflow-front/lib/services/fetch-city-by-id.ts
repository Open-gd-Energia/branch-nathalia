import type { IBGECity } from "../models/ibge";

export const fetchCityById = async (city: string): Promise<IBGECity> => {
	try {
		const res = await fetch(
			`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${city}`,
		);

		const contentType = res.headers.get("content-type");
		const data = contentType?.includes("application/json")
			? await res.json()
			: await res.text();

		if (!res.ok) {
			throw new Error("Ocorreu um erro ao buscar a cidade");
		}

		if (data?.erro === "true") throw new Error("Cidade não encontrado");

		return data;
	} catch (error) {
		console.error("[fetchCityById]:", error);
		throw error;
	}
};
