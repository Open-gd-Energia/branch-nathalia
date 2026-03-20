import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { fetchTariffRules } from "@/app/(core)/config/regras-tarifarias/_services/fetch";
import { fetchBillingType } from "@/app/(core)/config/tipo-faturamento/_services/fetch";
import { SearchSelect } from "@/components/search-select";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ZodUsinaFormData } from "./zod-schema";

export const ConfigsFaturamento = () => {
	const form = useFormContext<ZodUsinaFormData>();
	const { data: tariffRules, isLoading: loadingTariffRules } = useQuery({
		queryKey: ["regra-tarifaria-list"],
		queryFn: () => fetchTariffRules(),
	});
	const { data: faturamentoTipo, isLoading: loadingFaturamento } = useQuery({
		queryKey: ["faturamento-tipo-list"],
		queryFn: () => fetchBillingType(),
	});

	return (
		<>
			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="regraTarifaria"
					render={({ field }) => (
						<FormItem className="w-1/2">
							<FormLabel>Regra tarifária</FormLabel>
							<FormControl>
								<SearchSelect
									multiple={false}
									options={tariffRules || []}
									onValueChange={field.onChange}
									value={field.value}
									loading={loadingTariffRules}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="faturamentoTipo"
					render={({ field }) => (
						<FormItem className="w-1/2">
							<FormLabel>Tipo de faturamento</FormLabel>
							<FormControl>
								<SearchSelect
									multiple={false}
									options={faturamentoTipo || []}
									onValueChange={field.onChange}
									value={field.value}
									loading={loadingFaturamento}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="valorKwh"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">Valor pago por kWh</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									placeholder="Valor pago por kWh"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="w-full" />
			</div>
		</>
	);
};
