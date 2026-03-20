"use client";

import { ListFilter, Zap } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "@/app/(core)/_components/list-screen/search-input";
import { AlocacaoFiltersSheet } from "@/app/(core)/alocacao/_components/filters";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setAlocacaoItemFilters } from "@/lib/redux/features/alocacao/slice";
import { areFiltersEmpty } from "@/lib/utils";

export const ListHeader = () => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector((state) => state.alocacao.alocacaoItemFilters);

	const handleOnSearch = async (term: string) => {
		dispatch(setAlocacaoItemFilters({ ...filters, nomeUsina: term }));
		return [];
	};

	const isFiltersEmpty = areFiltersEmpty(filters);

	return (
		<div className="flex w-full justify-between gap-2">
			<div className="flex gap-2">
				<SearchInput placeholder="Nome da usina" onSearch={handleOnSearch} />
				<AlocacaoFiltersSheet hideConsumidor>
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

			<Link href={"/alocacao/novo"}>
				<Button size="sm">
					<Zap /> Alocar
				</Button>
			</Link>
		</div>
	);
};
