"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/hooks/redux";
import type { Usina } from "@/lib/models/usina";
import { toggleOpenPrevisaoSheet } from "@/lib/redux/features/previsao/slice";
import { fetchPrevisao } from "../_services/fetch";

export interface ListHeaderProps {
	usina: Usina | null;
}

export const ListHeader = ({ usina }: ListHeaderProps) => {
	const dispatch = useAppDispatch();
	const _handleOnSearch = useCallback(async (_name: string) => {
		return await fetchPrevisao({
			idUsina: usina?.id?.toString(),
		});
	}, []);

	const _handleClick = () => {
		dispatch(toggleOpenPrevisaoSheet(true));
	};

	return (
		<div className="flex w-full justify-between gap-2">
			<div className="flex gap-2" />
		</div>
	);
};
