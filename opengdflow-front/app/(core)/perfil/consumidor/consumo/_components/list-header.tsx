"use client";

import { ListFilter } from "lucide-react";
import { useCallback } from "react";
import { SearchInput } from "@/app/(core)/_components/list-screen/search-input";
import { InvoicesFiltersSheet } from "@/app/(core)/faturas/_components/filters";
import { fetchInvoices } from "@/app/(core)/faturas/_services/fetch";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { Consumer } from "@/lib/models/consumer";
import { areFiltersEmpty } from "@/lib/utils";

export interface ListHeaderProps {
	consumer: Consumer | null;
}

export const ListHeader = ({ consumer }: ListHeaderProps) => {
	const filters = useAppSelector((state) => state.invoices.filters);
	const handleOnSearch = useCallback(
		async (name: string) => {
			return await fetchInvoices(undefined, {
				...filters,
				nomeUsina: name,
				ucConsumidor: consumer?.uc,
			});
		},
		[filters],
	);

	const isFiltersEmpty = areFiltersEmpty(filters);

	return (
		<>
			<SearchInput placeholder="Nome da usina" onSearch={handleOnSearch} />
			<InvoicesFiltersSheet hideConsumidor>
				<div className="relative">
					<Button variant="outline" size="sm">
						<ListFilter /> Filtros
					</Button>
					{!isFiltersEmpty && (
						<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
					)}
				</div>
			</InvoicesFiltersSheet>
		</>
	);
};
