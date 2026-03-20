import { redirect } from "next/navigation";
import type { PageProps } from "@/lib/types/shared";

type ConsumerProfilePageProps = PageProps<{ usinaId: string }>;

export default async function ConsumerProfilePage({
	params,
}: ConsumerProfilePageProps) {
	const parameters = await params;

	redirect(`/usinas/${parameters?.usinaId}/alocacao`);
}
