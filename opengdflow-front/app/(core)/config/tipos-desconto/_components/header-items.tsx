"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { SearchInput } from "@/app/(core)/_components/list-screen/search-input";
import { buttonVariants } from "@/components/ui/button";
import { fetchDiscountTypes } from "../_services/fetch";

export const HeaderItems = () => {
	const handleOnSearch = useCallback(async (name: string) => {
		return await fetchDiscountTypes(name);
	}, []);

	return (
		<>
			<div className="flex items-center gap-2">
				<SearchInput onSearch={handleOnSearch} />
			</div>

			<Link
				href="/config/tipos-desconto/novo"
				className={buttonVariants({ size: "sm" })}
			>
				<Plus />
				Criar
			</Link>
		</>
	);
};
