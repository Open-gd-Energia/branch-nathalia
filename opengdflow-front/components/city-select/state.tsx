"use client";

import type { SelectProps } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { FC } from "react";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/redux";
import type { IBGEUF } from "@/lib/models/ibge";
import { setCurrentState } from "@/lib/redux/features/cities-select/slice";
import { fetchStates } from "./_services/fetch-states";

export interface StateSelectProps extends Omit<SelectProps, "onValueChange"> {
	onValueChange?: (value: IBGEUF) => void;
}

export const StateSelect: FC<StateSelectProps> = ({
	onValueChange,
	...props
}) => {
	const dispatch = useAppDispatch();
	const { data: states, isLoading } = useQuery({
		queryKey: ["states"],
		queryFn: fetchStates,
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	});

	const handleStateChange = (value: string) => {
		const selectedState = states?.find((state) => state.id === Number(value));

		if (!selectedState) {
			console.warn("[handleStateChange]: State not found");
			toast.error("Problema ao selecionar estado, tente novamente mais tarde!");
			return;
		}

		dispatch(setCurrentState(selectedState));
		onValueChange?.(selectedState);
	};

	return (
		<Select onValueChange={handleStateChange} {...props}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Selecione um estado" />
			</SelectTrigger>
			<SelectContent>
				{isLoading && (
					<SelectItem value="loading" disabled>
						Carregando <Loader2 className="animate-spin" size={12} />
					</SelectItem>
				)}
				{states?.map((estado) => (
					<SelectItem key={estado?.sigla} value={estado?.id?.toString()}>
						{estado?.nome} ({estado?.sigla})
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
