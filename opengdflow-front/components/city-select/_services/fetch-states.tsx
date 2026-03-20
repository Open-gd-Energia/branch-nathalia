import type { IBGEUF } from "@/lib/models/ibge";

export const fetchStates = async (): Promise<IBGEUF[]> => {
	try {
		const queryParams = new URLSearchParams({
			orderBy: "nome",
		});

		const res = await fetch(
			`https://servicodados.ibge.gov.br/api/v1/localidades/estados?${queryParams.toString()}`,
			{
				cache: "force-cache",
				next: {
					revalidate: 60 * 60 * 24,
				},
			},
		);
		if (!res.ok) {
			throw new Error("Failed to fetch states");
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("[fetchStates]:", error);
		return [];
	}
};
