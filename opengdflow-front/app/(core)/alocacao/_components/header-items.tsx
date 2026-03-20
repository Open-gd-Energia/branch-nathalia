"use client";

import { ListFilter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { areFiltersEmpty } from "@/lib/utils";
import { ItemsPerPageSelect } from "../../_components/list-screen/items-per-page-select";
import { AlocacaoFiltersSheet } from "./filters";

export const HeaderItems = () => {
	const router = useRouter();
	const filters = useAppSelector((state) => state.alocacao.alocacaoItemFilters);

	// const handleOnSearch = useCallback(
	// 	async (name: string) => {
	// 		return await fetchAlocacoes(name, filters);
	// 	},
	// 	[filters],
	// );

	const isFiltersEmpty = areFiltersEmpty(filters);

	return (
		<>
			<div className="flex items-center gap-2">
				{/* <SearchInput onSearch={handleOnSearch} /> */}
				<AlocacaoFiltersSheet>
					<div className="relative">
						<Button variant="outline" size="sm">
							<ListFilter /> Filtros
						</Button>
						{!isFiltersEmpty && (
							<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
						)}
					</div>
				</AlocacaoFiltersSheet>
			</div>

			<div className="flex items-center gap-2">
				<ItemsPerPageSelect />
				<Button onClick={() => router.push("/alocacao/novo")} size="sm">
					<Plus />
					Criar
				</Button>
			</div>
		</>
	);
};
