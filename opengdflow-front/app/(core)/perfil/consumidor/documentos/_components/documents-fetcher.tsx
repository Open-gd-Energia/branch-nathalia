"use client";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import type { Consumer } from "@/lib/models/consumer";
import { fetchDocuments } from "@/lib/services/documents/fetch";
import { ConsumidorDocumentosList } from "./documentos-list";
import { ListHeader } from "./list-header";

export const DocumentsFetcher: FC<{ consumer: Consumer }> = ({ consumer }) => {
	const { data, refetch } = useQuery({
		queryKey: ["consumer-documentos", consumer?.id],
		queryFn: () => {
			return fetchDocuments({
				queryParams: {
					idConsumidor: consumer?.id?.toString(),
				},
			});
		},
	});

	return (
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
	);
};
