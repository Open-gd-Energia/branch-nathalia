"use client";

import { ListFilter, Plus } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { areFiltersEmpty } from "@/lib/utils";
import { ItemsPerPageSelect } from "../../../_components/list-screen/items-per-page-select";
import { SearchInput } from "../../../_components/list-screen/search-input";
import { fetchBillingType } from "../_services/fetch";
import { BillingTypeFiltersSheet } from "./filters";

export const HeaderItems = () => {
	const filters = useAppSelector((state) => state.billingType.filters);

	const handleOnSearch = useCallback(async (name: string) => {
		return await fetchBillingType(name);
	}, []);

	const isFiltersEmpty = areFiltersEmpty(filters);

	return (
		<>
			<div className="flex items-center gap-2">
				<SearchInput onSearch={handleOnSearch} />
				<BillingTypeFiltersSheet>
					<div className="relative">
						<Button variant="outline" size="sm">
							<ListFilter /> Filtros
						</Button>
						{!isFiltersEmpty && (
							<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
						)}
					</div>
				</BillingTypeFiltersSheet>
			</div>
			<div className="flex items-center gap-2">
				<ItemsPerPageSelect />

				<Link
					href="/config/tipo-faturamento/novo"
					className={buttonVariants({
						size: "sm",
					})}
				>
					<Plus />
					Criar
				</Link>
			</div>
		</>
	);
};
