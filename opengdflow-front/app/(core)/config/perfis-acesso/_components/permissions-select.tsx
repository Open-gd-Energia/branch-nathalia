import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { SearchSelect } from "@/components/search-select";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { fetchPermissions } from "../_services/fetch-permissions";
import type { AccessProfilesForm } from "./upsert-access-profiles-sheet";

export const PermissionSelect = () => {
	const form = useFormContext<AccessProfilesForm>();
	const { data, isLoading } = useQuery({
		queryKey: ["permissions-list"],
		queryFn: fetchPermissions,
		refetchOnWindowFocus: false,
	});

	return (
		<FormField
			control={form.control}
			name="permissoes"
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>Permissões</FormLabel>
					<FormControl>
						<SearchSelect
							multiple
							options={data ?? []}
							loading={isLoading}
							onValueChange={field.onChange}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
