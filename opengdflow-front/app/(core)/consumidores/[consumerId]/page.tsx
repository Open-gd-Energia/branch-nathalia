import { redirect } from "next/navigation";
import type { PageProps } from "@/lib/types/shared";

type ConsumerProfilePageProps = PageProps<{ consumerId: string }>;

export default async function ConsumerProfilePage({
	params,
}: ConsumerProfilePageProps) {
	const parameters = await params;

	redirect(`/consumidores/${parameters?.consumerId}/alocacao`);
}
