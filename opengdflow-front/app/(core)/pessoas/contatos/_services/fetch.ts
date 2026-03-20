import { fetcher } from "@/lib/fetcher";
import type { Contact } from "@/lib/models/contact";

export const fetchContacts = async (name?: string): Promise<Contact[]> => {
	try {
		const queryParams = new URLSearchParams({
			status: "1",
		});
		if (name) {
			queryParams.append("nomeFisica", name);
			queryParams.append("razaoSocial", name);
			queryParams.append("nomeFantasia", name);
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Contact[]>(`/representantes${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchContacts]:", error);
		return [];
	}
};
