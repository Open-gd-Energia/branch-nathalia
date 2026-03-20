"use client";

import { ListFilter } from "lucide-react";
import { SearchInput } from "@/app/(core)/_components/list-screen/search-input";
import { InvoicesFiltersSheet } from "@/app/(core)/faturas/_components/filters";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { Consumer } from "@/lib/models/consumer";
import { setInvoicesFilters } from "@/lib/redux/features/invoices/slice";
import { areFiltersEmpty } from "@/lib/utils";

export interface ListHeaderProps {
	consumer: Consumer | null;
}

export const ListHeader = () => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector((state) => state.invoices.filters);

	const handleOnSearch = async (term: string) => {
		dispatch(setInvoicesFilters({ ...filters, nomeUsina: term }));
		return [];
	};

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
