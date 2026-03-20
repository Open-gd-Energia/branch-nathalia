import type { IBGECity } from "@/lib/models/ibge";

export const fetchCities = async (stateId: number): Promise<IBGECity[]> => {
	try {
		if (!stateId) {
			return [];
		}

		const queryParams = new URLSearchParams({
			orderBy: "nome",
		});

		const res = await fetch(
			`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios?${queryParams.toString()}`,
			{
				cache: "force-cache",
				next: {
					revalidate: 60 * 60 * 24,
				},
			},
		);
		if (!res.ok) {
			throw new Error("Erro ao buscar cidades");
		}

		const data = (await res.json()) as IBGECity[];
		return data;
	} catch (error) {
		console.error("[fetchCitites]:", error);
		throw error;
	}
};
