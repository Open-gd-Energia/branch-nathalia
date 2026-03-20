"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ItemsPerPageSelect } from "../../../_components/list-screen/items-per-page-select";
import { SearchInput } from "../../../_components/list-screen/search-input";
import { fetchInternalUsers } from "../_services/fetch";

export const HeaderItems = () => {
	const handleOnSearch = useCallback(async (name: string) => {
		return await fetchInternalUsers(name);
	}, []);

	return (
		<>
			<div className="flex items-center gap-2">
				<SearchInput onSearch={handleOnSearch} />
			</div>

			<div className="flex items-center gap-2">
				<ItemsPerPageSelect />
				<Link
					className={buttonVariants({ size: "sm" })}
					href="/pessoas/usuarios/novo"
				>
					<Plus />
					Criar
				</Link>
			</div>
		</>
	);
};
