import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ZodCobrancaReceberFormData } from "../zod-schemas";

export const DadosCalculoReceber = () => {
	const form = useFormContext<ZodCobrancaReceberFormData>();

	return (
		<>
			<div className="flex items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="consumoTotal"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Consumo total (kWh)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Consumo total (kWh)"
									{...field}
								/>
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
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="flex items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="tarifaComImposto"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Tarifa com imposto (R$)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Tarifa com imposto (R$)"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tarifaSemImposto"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Tarifa sem imposto (R$)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Tarifa sem imposto (R$)"
									{...field}
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
					name="tarifaDesconto"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Tarifa de desconto (R$)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Tarifa de desconto (R$)"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="saldoCreditos"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Saldo de créditos (kWh)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Saldo de créditos (kWh)"
									{...field}
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
									placeholder="Energia compensada (kWh)"
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
								Tarifa energia compensada (R$)
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									placeholder="Tarifa energia compensada (R$)"
									value={field.value ?? undefined}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="grid grid-cols-2 items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="energiaInjetada"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Energia Injetada (kWh)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									{...field}
									placeholder="Energia Injetada (kWh)"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div />
			</div>

			<div className="flex items-start gap-2 justify-between">
				<FormField
					control={form.control}
					name="adicionalBandeira"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Adicional de bandeira (kWh)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Adicional de bandeira (kWh)"
									{...field}
									value={field.value ?? undefined}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tarifaAdicionalBandeira"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Tarifa adicional de bandeira (R$)
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Tarifa adicional de bandeira (R$)"
									{...field}
									value={field.value ?? undefined}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	);
};
