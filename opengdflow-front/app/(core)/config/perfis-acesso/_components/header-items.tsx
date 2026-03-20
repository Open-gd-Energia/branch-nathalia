"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ItemsPerPageSelect } from "../../../_components/list-screen/items-per-page-select";

export const HeaderItems = () => {
	return (
		<>
			<div />

			<div className="flex items-center gap-2">
				<ItemsPerPageSelect />
				<Link
					href="/config/perfis-acesso/novo"
					className={buttonVariants({ size: "sm" })}
				>
					<Plus />
					Criar
				</Link>
			</div>
		</>
	);
};
