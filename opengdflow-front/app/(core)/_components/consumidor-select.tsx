"use client";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import {
	SearchSelect,
	type SearchSelectProps,
} from "@/components/search-select";
import type { Consumer } from "@/lib/models/consumer";
import { fetchConsumers } from "../consumidores/_services/fetch";

// Single selection props
interface SingleConsumidorSelectProps {
	multiple?: false;
	value: Consumer | null;
	onValueChange?: (value: Consumer | null) => void;
}

// Multiple selection props
interface MultiConsumidorSelectProps {
	multiple: true;
	value: Consumer[];
	onValueChange?: (value: Consumer[]) => void;
}

// Combined props type
export type ConsumidorSelectProps = Omit<
	SingleConsumidorSelectProps | MultiConsumidorSelectProps,
	"options" | "loading"
>;

export const ConsumidorSelect: FC<ConsumidorSelectProps> = ({
	multiple = false,
	...props
}) => {
	const { data, isLoading } = useQuery({
		queryKey: ["consumers-list"],
		queryFn: () => fetchConsumers(undefined, { status: "ATIVO" }),
		refetchOnWindowFocus: false,
	});

	// Ensure multiple is a literal true when enabled
	const searchSelectProps = {
		...props,
		multiple,
		options: data ?? [],
		loading: isLoading,
	} as SearchSelectProps<Consumer>;

	return <SearchSelect<Consumer> {...searchSelectProps} />;
};
