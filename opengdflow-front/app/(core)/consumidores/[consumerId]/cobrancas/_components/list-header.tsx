"use client";

import { useAppSelector } from "@/hooks/redux";
import type { Consumer } from "@/lib/models/consumer";
import { areFiltersEmpty } from "@/lib/utils";

export interface ListHeaderProps {
	consumer: Consumer | null;
}

export const ListHeader = ({ consumer }: ListHeaderProps) => {
	const filters = useAppSelector((state) => state.cobrancas.filters);
	// const handleOnSearch = useCallback(
	// 	async (name: string) => {
	// 		return await fetchAlocacoes(undefined, {
	// 			...filters,
	// 			nomeUsina: name,
	// 			ucConsumidor: consumer?.uc,
	// 		});
	// 	},
	// 	[filters],
	// );

	const _isFiltersEmpty = areFiltersEmpty(filters);

	return (
		<div className="flex w-full justify-between gap-2">
			{/* FIXME: tem q ter alguma coisa */}
			{/* <SearchInput placeholder="Nome da usina" onSearch={handleOnSearch} /> */}
			{/* <CobrancaFiltersSheet>
				<div className="relative">
					<Button variant="outline" size="sm">
						<ListFilter /> Filtros
					</Button>
					{!isFiltersEmpty && (
						<span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
					)}
				</div>
			</AlocacaoFiltersSheet> */}
		</div>
	);
};
