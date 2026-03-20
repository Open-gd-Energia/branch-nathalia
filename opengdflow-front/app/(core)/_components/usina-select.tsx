"use client";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import {
	SearchSelect,
	type SearchSelectProps,
} from "@/components/search-select";
import type { Usina } from "@/lib/models/usina";
import { fetchUsinas } from "../_services/fetch-usinas";

// Single selection props
interface SingleUsinaSelectProps {
	multiple?: false;
	value: Usina | null;
	onValueChange?: (value: Usina | null) => void;
}

// Multiple selection props
interface MultiUsinaSelectProps {
	multiple: true;
	value: Usina[];
	onValueChange?: (value: Usina[]) => void;
}

// Combined props type
export type UsinaSelectProps = Omit<
	SingleUsinaSelectProps | MultiUsinaSelectProps,
	"options" | "loading"
>;

export const UsinaSelect: FC<UsinaSelectProps> = ({
	multiple = false,
	...props
}) => {
	const { data, isLoading } = useQuery({
		queryKey: ["fetch-usinas"],
		queryFn: () => fetchUsinas(undefined),
		refetchOnWindowFocus: false,
	});

	// Ensure multiple is a literal true when enabled
	const searchSelectProps = {
		...props,
		multiple,
		options: data ?? [],
		loading: isLoading,
	} as SearchSelectProps<Usina>;

	return <SearchSelect<Usina> {...searchSelectProps} />;
};
