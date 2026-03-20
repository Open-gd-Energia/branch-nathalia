import { fetcher } from "@/lib/fetcher";
import type { Contact } from "@/lib/models/contact";

export const fetchContactById = async (
	id: string | number,
): Promise<Contact | null> => {
	try {
		const response = await fetcher<Contact>(`/representantes/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchContactById]:", error);
		return null;
	}
};
