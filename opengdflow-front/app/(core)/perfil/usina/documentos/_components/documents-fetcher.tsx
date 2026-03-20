"use client";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import type { Usina } from "@/lib/models/usina";
import { fetchDocuments } from "@/lib/services/documents/fetch";
import { UsinaDocumentosList } from "./documentos-list";
import { ListHeader } from "./list-header";

export const DocumentsFetcher: FC<{ usina: Usina }> = ({ usina }) => {
	const { data, refetch } = useQuery({
		queryKey: ["usina-documentos", usina?.id],
		queryFn: () => {
			return fetchDocuments({
				queryParams: {
					idUsina: usina?.id as string,
				},
			});
		},
	});

	return (
		<>
			<div className="flex gap-2 px-5 py-2 items-center w-full">
				<ListHeader usina={usina} afterFileUpload={refetch} />
			</div>
			<section className="h-full">
				<UsinaDocumentosList documentsList={data ?? []} refetch={refetch} />
			</section>
		</>
	);
};
