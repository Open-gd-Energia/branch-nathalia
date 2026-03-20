"use client";
import type { SelectProps } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import type { ComponentProps, FC } from "react";
import { fetchAccessProfiles } from "@/app/(core)/config/perfis-acesso/_services/fetch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export interface AccessProfileSelect extends ComponentProps<FC<SelectProps>> {}

export const AccessProfilesSelect: FC<AccessProfileSelect> = (props) => {
	const { data: accessProfiles, isLoading } = useQuery({
		queryKey: ["access-profiles-list"],
		queryFn: async () => fetchAccessProfiles(),
	});

	return (
		<Select {...props}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Selecione..." />
			</SelectTrigger>
			<SelectContent>
				{isLoading && <SelectItem value="loading">Carregando...</SelectItem>}
				{accessProfiles?.map((accessProfile) => (
					<SelectItem
						key={accessProfile.id}
						value={accessProfile.id.toString()}
					>
						{accessProfile.nome}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
