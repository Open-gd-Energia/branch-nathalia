"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDocuments } from "@/lib/services/documents/fetch";
import { fetchUsinaById } from "../../_services/fetch-by-id";
import { UsinaDocumentosList } from "./_components/documentos-list";
import { ListHeader } from "./_components/list-header";

export default function UsinaDocumentsPage() {
	const parameters = useParams();
	const { data: usina, isLoading } = useQuery({
		queryKey: ["usina", parameters?.usinaId],
		queryFn: async () => {
			return await fetchUsinaById((parameters?.usinaId as string) || "");
		},
	});
	const { data, refetch } = useQuery({
		queryKey: ["usina-documentos", usina?.id],
		queryFn: () => {
			return fetchDocuments({
				queryParams: {
					idUsina: parameters?.usinaId as string,
				},
			});
		},
	});

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Documentos</h1>
			{!isLoading && usina ? (
				<>
					<div className="flex gap-2 px-5 py-2 items-center w-full">
						<ListHeader usina={usina} afterFileUpload={refetch} />
					</div>
					<section className="h-full">
						<UsinaDocumentosList documentsList={data ?? []} refetch={refetch} />
					</section>
				</>
			) : (
				<div className="flex flex-col flex-1 w-full  bg-red">
					<div className="flex w-full px-5 py-2">
						<Skeleton className="w-full h-8" />
					</div>
					<Skeleton className="w-full rounded-none h-full" />
				</div>
			)}
		</div>
	);
}
