"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ItemsPerPageSelect } from "../../../_components/list-screen/items-per-page-select";
import { SearchInput } from "../../../_components/list-screen/search-input";
import { fetchContacts } from "../_services/fetch";

export const HeaderItems = () => {
	const handleOnSearch = useCallback(async (name: string) => {
		return await fetchContacts(name);
	}, []);

	return (
		<>
			<div className="flex items-center gap-2">
				<SearchInput onSearch={handleOnSearch} />
			</div>

			<div className="flex items-center gap-2">
				<ItemsPerPageSelect />
				<Link
					href="/pessoas/contatos/novo"
					className={buttonVariants({ size: "sm" })}
				>
					<Plus />
					Criar
				</Link>
			</div>
		</>
	);
};
