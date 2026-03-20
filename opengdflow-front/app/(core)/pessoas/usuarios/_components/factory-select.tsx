"use client";

import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { SearchSelect } from "@/components/search-select";
import type { Usina } from "@/lib/models/usina";
import { fetchFactories } from "../_services/fetch-factories";

export interface UsinasSelectProps {
	onValueChange?: (consumers: Usina[]) => void;
	value: Usina[];
}

export const UsinasSelect: FC<UsinasSelectProps> = ({
	onValueChange,
	value,
}) => {
	const { data: usinas } = useQuery({
		queryKey: ["usinas-list"],
		queryFn: fetchFactories,
	});

	return (
		<SearchSelect
			multiple
			options={usinas || []}
			onValueChange={onValueChange}
			value={value}
		/>
	);
};
