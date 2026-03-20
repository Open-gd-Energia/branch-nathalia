"use client";

import { ListFilter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { areFiltersEmpty } from "@/lib/utils";
import { ItemsPerPageSelect } from "../../_components/list-screen/items-per-page-select";
import { SearchInput } from "../../_components/list-screen/search-input";
import { fetchInvoices } from "../_services/fetch";
import { InvoicesFiltersSheet } from "./filters";

export const HeaderItems = () => {
	const router = useRouter();
	const filters = useAppSelector((state) => state.invoices.filters);

	const handleOnSearch = useCallback(
		async (name: string) => {
			return await fetchInvoices(name, filters);
		},
		[filters],
	);

	const isFiltersEmpty = areFiltersEmpty(filters);

	const handleCreateInvoice = useCallback(() => {
		router?.push("/faturas/novo");
	}, [router]);

	return (
		<>
			<div className="flex items-center gap-2">
				<SearchInput onSearch={handleOnSearch} />
				<InvoicesFiltersSheet>
					<div className="relative">
						<Button variant="outline" size="sm">
							<ListFilter /> Filtros
						</Button>
						{!isFiltersEmpty && (
							<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
						)}
					</div>
				</InvoicesFiltersSheet>
			</div>

			<div className="flex items-center gap-2">
				<ItemsPerPageSelect />
				<Button onClick={handleCreateInvoice} size="sm">
					<Plus />
					Criar
				</Button>
			</div>
		</>
	);
};
