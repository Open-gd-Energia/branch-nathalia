import { fetcher } from "@/lib/fetcher";
import type { Contact, ContactRequest } from "@/lib/models/contact";

export type UpsertContact = ContactRequest & {
	id?: number;
};

export const upsertContact = async (data: UpsertContact): Promise<Contact> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/representantes/${data.id}` : "/representantes";

		const res = await fetcher<Contact>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertContact]:", error);
		throw error;
	}
};
