"use client";

import { ListFilter, Plus } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleOpenUsinaSheet } from "@/lib/redux/features/usinas/slice";
import { areFiltersEmpty } from "@/lib/utils";
import { ItemsPerPageSelect } from "../../_components/list-screen/items-per-page-select";
import { SearchInput } from "../../_components/list-screen/search-input";
import { fetchUsinas } from "../_services/fetch";
import { UsinasFiltersSheet } from "./filters";

export const HeaderItems = () => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector((state) => state.usinas.filters);

	const handleOnSearch = useCallback(async (name: string) => {
		return await fetchUsinas(name, filters);
	}, []);

	const isFiltersEmpty = areFiltersEmpty(filters);

	return (
		<>
			<div className="flex items-center gap-2">
				<SearchInput onSearch={handleOnSearch} />
				<UsinasFiltersSheet>
					<div className="relative">
						<Button variant="outline" size="sm">
							<ListFilter /> Filtros
						</Button>
						{!isFiltersEmpty && (
							<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
						)}
					</div>
				</UsinasFiltersSheet>
			</div>

			<div className="flex items-center gap-2">
				<ItemsPerPageSelect />
				<Button onClick={() => dispatch(toggleOpenUsinaSheet())} size="sm">
					<Plus />
					Criar
				</Button>
			</div>
		</>
	);
};
