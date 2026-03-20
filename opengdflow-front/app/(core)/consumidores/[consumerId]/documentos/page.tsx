"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDocuments } from "@/lib/services/documents/fetch";
import { fetchConsumerById } from "../../_services/fetch-by-id";
import { ConsumidorDocumentosList } from "./_components/documentos-list";
import { ListHeader } from "./_components/list-header";

export default function ConsumerDocumentsPage() {
	const parameters = useParams();
	const { data: consumer, isLoading } = useQuery({
		queryKey: ["consumer", parameters?.consumerId],
		queryFn: async () => {
			return await fetchConsumerById((parameters?.consumerId as string) || "");
		},
	});
	const { data, refetch } = useQuery({
		queryKey: ["consumer-documentos", consumer?.id],
		queryFn: () => {
			return fetchDocuments({
				queryParams: {
					idConsumidor: parameters?.consumerId as string,
				},
			});
		},
	});

	return (
		<div className="flex flex-col flex-1 h-full">
			<h1 className="px-5 text-sm font-semibold leading-6">Documentos</h1>
			{!isLoading && consumer ? (
				<>
					<div className="flex gap-2 px-5 py-2 items-center w-full">
						<ListHeader consumer={consumer} afterFileUpload={refetch} />
					</div>
					<section className="h-full">
						<ConsumidorDocumentosList
							documentsList={data ?? []}
							refetch={refetch}
						/>
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
