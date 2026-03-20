"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { ItemsPerPageSelect } from "@/app/(core)/_components/list-screen/items-per-page-select";
import { SearchInput } from "@/app/(core)/_components/list-screen/search-input";
import { buttonVariants } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import { FiltersButton } from "../../_components/filters";
import { fetchCobranca } from "../../_services/fetch";

export const HeaderItems = () => {
	const filters = useAppSelector((state) => state.cobrancas.filters);

	const handleOnSearch = useCallback(
		async (identificador: string) => {
			return await fetchCobranca({
				...filters,
				identificador,
				tipo: "RECEBER",
			});
		},
		[filters],
	);

	return (
		<>
			<div className="flex items-center gap-2">
				<SearchInput
					placeholder="Procurar por número da cobrança"
					onSearch={handleOnSearch}
				/>
				<FiltersButton />
			</div>

			<div className="flex items-center gap-2">
				<ItemsPerPageSelect />
				<Link
					className={buttonVariants({ size: "sm" })}
					href={"/cobrancas/receber/novo"}
				>
					<Plus />
					Criar
				</Link>
			</div>
		</>
	);
};
