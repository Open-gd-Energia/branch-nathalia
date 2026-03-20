"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/hooks/redux";
import type { Usina } from "@/lib/models/usina";
import { fetchGeracao } from "../_services/fetch";

export interface ListHeaderProps {
	usina: Usina | null;
}

export const ListHeader = ({ usina }: ListHeaderProps) => {
	const _dispatch = useAppDispatch();
	const _handleOnSearch = useCallback(async (_name: string) => {
		return await fetchGeracao({
			idUsina: usina?.id?.toString(),
		});
	}, []);

	return (
		<div className="flex w-full justify-between gap-2">
			<div className="flex gap-2" />
		</div>
	);
};
