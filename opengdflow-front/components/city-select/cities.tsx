"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/hooks/redux";
import type { IBGECity } from "@/lib/models/ibge";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { fetchCities } from "./_services/fetch-cities";

export interface CitiesSelectProps {
	onValueChange?: (selectedCities: IBGECity[]) => void;
}

export const CitiesSelect: FC<CitiesSelectProps> = ({ onValueChange }) => {
	const currentState = useAppSelector(
		(state) => state.citiesSelect.currentState,
	);

	const [open, setOpen] = useState(false);
	const [selectedCities, setSelectedCities] = useState<IBGECity[]>([]);

	const { data: cities, refetch } = useQuery({
		queryKey: ["cidades"],
		queryFn: async () => {
			if (!currentState?.id) return [];
			return await fetchCities(currentState.id);
		},
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	});

	// When state changes, refetch cities
	useEffect(() => {
		if (!currentState) return;
		refetch();
	}, [currentState]);

	const handleCitySelect = (currentCity: IBGECity) => {
		let newSelectedCities: IBGECity[] = [];
		// toggle city selection
		if (selectedCities.includes(currentCity)) {
			newSelectedCities = selectedCities.filter((c) => c !== currentCity);
		} else {
			newSelectedCities = [...selectedCities, currentCity];
		}
		setSelectedCities(newSelectedCities);
		onValueChange?.(newSelectedCities);
	};

	const removeCity = (cityId: number) => {
		const newSelectedCities = selectedCities.filter((c) => c.id !== cityId);
		setSelectedCities(newSelectedCities);
		onValueChange?.(newSelectedCities);
	};

	const cleanupCities = () => {
		setSelectedCities([]);
		onValueChange?.([]);
	};

	return (
		<>
			<Popover modal open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						aria-expanded={open}
						className="w-full justify-between h-auto min-h-10 hover:bg-background"
						disabled={!currentState}
					>
						{selectedCities.length > 0 ? (
							<div className="flex flex-wrap gap-1 py-1">
								{selectedCities.map((cidade) => (
									<Badge
										key={cidade.id}
										className="mr-1 mb-1"
										variant="secondary"
									>
										{cidade.nome}
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<span
														className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
														onClick={(e) => {
															// e.preventDefault();
															e.stopPropagation();
															removeCity(cidade.id);
														}}
													>
														<X className="h-3 w-3" />
													</span>
												</TooltipTrigger>
												<TooltipContent>
													<span>Remover {cidade.nome}</span>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</Badge>
								))}
							</div>
						) : (
							<span className="text-muted-foreground">
								{currentState
									? "Selecione cidades..."
									: "Primeiro selecione um estado"}
							</span>
						)}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0" align="start">
					<Command className="max-h-[300px] overflow-auto relative">
						<CommandInput
							placeholder="Buscar cidade..."
							className="h-9"
							disabled={!currentState}
						/>
						<CommandList className="max-h-[250px] overflow-auto">
							<CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
							<CommandGroup>
								{(cities || []).map((cidade) => (
									<CommandItem
										key={cidade.id}
										value={cidade.nome}
										onSelect={() => {
											handleCitySelect(cidade);
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												selectedCities.includes(cidade)
													? "bg-primary text-primary-foreground"
													: "opacity-50",
											)}
										>
											{selectedCities.includes(cidade) && (
												<Check className="h-3 w-3" />
											)}
										</div>
										<span>{cidade.nome}</span>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{selectedCities.length > 0 && (
				<div className="mt-1 flex justify-end text-sm text-muted-foreground">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={cleanupCities}
						className="h-auto py-1 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
					>
						Limpar todas
					</Button>
				</div>
			)}
		</>
	);
};

// usage example
/* <div className="flex gap-2 items-start">
	<FormItem className="w-1/3">
		<FormLabel>Estado</FormLabel>
		<StateSelect />
	</FormItem>

	<FormField
		control={form.control}
		name="cidades"
		render={({ field }) => (
			<FormItem className="w-full">
				<FormLabel>Cidades</FormLabel>
				<FormControl>
					<CitiesSelect onValueChange={field.onChange} />
				</FormControl>
			</FormItem>
		)}
	/>
</div> */
