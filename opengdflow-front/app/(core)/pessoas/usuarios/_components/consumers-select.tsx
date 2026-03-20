"use client";

import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { SearchSelect } from "@/components/search-select";
import type { Consumer } from "@/lib/models/consumer";
import { fetchConsumers } from "../_services/fetch-consumers";

export interface ConsumersSelectProps {
	onValueChange?: (consumers: Consumer[]) => void;
	value: Consumer[];
}

export const ConsumersSelect: FC<ConsumersSelectProps> = ({
	onValueChange,
	value,
}) => {
	const { data: consumers, isLoading } = useQuery({
		queryKey: ["consumers-list"],
		queryFn: fetchConsumers,
	});

	return (
		<SearchSelect
			multiple
			options={consumers || []}
			loading={isLoading}
			onValueChange={onValueChange}
			value={value}
		/>
	);
};
