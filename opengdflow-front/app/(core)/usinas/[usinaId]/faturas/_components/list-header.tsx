"use client";

import { ListFilter } from "lucide-react";
import { InvoicesFiltersSheet } from "@/app/(core)/faturas/_components/filters";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { Usina } from "@/lib/models/usina";
import { areFiltersEmpty } from "@/lib/utils";

export interface ListHeaderProps {
	usina: Usina | null;
}

export const ListHeader = ({ usina }: ListHeaderProps) => {
	const filters = useAppSelector((state) => state.invoices.filters);

	const isFiltersEmpty = areFiltersEmpty(filters);

	return (
		<>
			{/* <SearchInput placeholder="Nome da usina" onSearch={handleOnSearch} /> */}
			<InvoicesFiltersSheet hideUsina>
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
