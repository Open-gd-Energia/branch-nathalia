import { fetcher } from "@/lib/fetcher";

export const deleteBillingType = async (id: string) => {
	try {
		const res = await fetcher(`/faturamentoTipo/${id}`, {
			method: "DELETE",
		});
		return res.data;
	} catch (error) {
		console.error("[deleteBillingType]:", error);
		throw error;
	}
};
