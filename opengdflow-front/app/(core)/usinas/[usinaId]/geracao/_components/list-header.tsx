"use client";

import { Plus } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import type { Usina } from "@/lib/models/usina";
import { toggleOpenGeracaoSheet } from "@/lib/redux/features/geracao/slice";
import { fetchGeracao } from "../_services/fetch";

export interface ListHeaderProps {
	usina: Usina | null;
}

export const ListHeader = ({ usina }: ListHeaderProps) => {
	const dispatch = useAppDispatch();
	const _handleOnSearch = useCallback(async (_name: string) => {
		return await fetchGeracao({
			idUsina: usina?.id?.toString(),
		});
	}, []);

	const handleClick = () => {
		dispatch(toggleOpenGeracaoSheet(true));
	};

	return (
		<div className="flex w-full justify-between gap-2">
			<div className="flex gap-2" />
			<Button size="sm" onClick={handleClick}>
				<Plus /> Adicionar
			</Button>
		</div>
	);
};
