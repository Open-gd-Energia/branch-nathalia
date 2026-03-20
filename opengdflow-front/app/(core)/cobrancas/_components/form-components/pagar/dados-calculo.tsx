import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ZodCobrancaFormData } from "../zod-schemas";

export const DadosCalculoPagar = () => {
	const form = useFormContext<ZodCobrancaFormData>();

	return (
		<>
			<div className="flex items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="energiaInjetada"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Energia injetada (kWh)
							</FormLabel>
							<FormControl>
								<Input type="number" step="0.01" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full" />
			</div>

			<div className="flex items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="consumoLocal"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Consumo local da usina (kWh)
							</FormLabel>
							<FormControl>
								<Input type="number" step="0.01" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tarifaConsumoLocal"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Tarifa Consumo local da usina
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									step="0.01"
									{...field}
									value={field.value ?? undefined}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="flex items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="energiaCompensada"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Energia compensada (kWh)
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									step="0.01"
									value={field.value ?? undefined}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tarifaEnergiaCompensada"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Tarifa Energia compensada
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									step="0.01"
									value={field.value ?? undefined}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className="flex items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="energiaDistribuida"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Energia/créditos distribuídos (kWh)
							</FormLabel>
							<FormControl>
								<Input type="number" step="0.01" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tarifaEnergiaDistribuida"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Tarifa Energia/créditos distribuídos
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									step="0.01"
									{...field}
									value={field.value ?? undefined}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="flex items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="valorTotalDistribuidora"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Valor fatura distribuidora (R$)
							</FormLabel>
							<FormControl>
								<Input type="number" step="0.01" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="valorTotal"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">Valor total (R$)</FormLabel>
							<FormControl>
								<Input type="number" step="0.01" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	);
};
