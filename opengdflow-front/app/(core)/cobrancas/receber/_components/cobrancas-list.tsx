"use client";

import type { FC } from "react";
import { useAppSelector } from "@/hooks/redux";
import type { Cobranca } from "@/lib/models/cobranca";
import { GridView } from "./grid-view";
import { ListView } from "./list-view";

export interface CobrancasListProps {
	data: Cobranca[];
}

export const CobrancasList: FC<CobrancasListProps> = ({
	data: cobrancasList,
}) => {
	const visualization = useAppSelector(
		(state) => state.cobrancas.visualization,
	);

	return visualization === "list" ? (
		<ListView data={cobrancasList} />
	) : (
		<GridView data={cobrancasList} />
	);
};
