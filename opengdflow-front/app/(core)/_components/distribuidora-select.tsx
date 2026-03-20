"use client";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import {
	SearchSelect,
	type SearchSelectProps,
} from "@/components/search-select";
import type { Distribuitors } from "@/lib/models/distribuidora";
import { fetchDistribuitors } from "../config/distribuidoras/_services/fetch";

// Single selection props
interface SingleDistribuidorSelectProps {
	multiple?: false;
	value: Distribuitors | null;
	onValueChange?: (value: Distribuitors | null) => void;
}

// Multiple selection props
interface MultiDistribuidorSelectProps {
	multiple: true;
	value: Distribuitors[];
	onValueChange?: (value: Distribuitors[]) => void;
}

// Combined props type
export type DistribuidorSelectProps = Omit<
	SingleDistribuidorSelectProps | MultiDistribuidorSelectProps,
	"options" | "loading"
>;

export const DistribuidorSelect: FC<DistribuidorSelectProps> = ({
	multiple = false,
	...props
}) => {
	const { data, isLoading } = useQuery({
		queryKey: ["distribuidoras-list"],
		queryFn: () => fetchDistribuitors(),
		refetchOnWindowFocus: false,
	});

	// Ensure multiple is a literal true when enabled
	const searchSelectProps = {
		...props,
		multiple,
		options: data ?? [],
		loading: isLoading,
	} as SearchSelectProps<Distribuitors>;

	return <SearchSelect<Distribuitors> {...searchSelectProps} />;
};
