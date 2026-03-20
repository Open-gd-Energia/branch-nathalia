"use client";
import { Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MonthPicker } from "@/components/month-picker";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ZodInvoiceFormData } from "./zod-schemas";

export const AdditionalFields = () => {
	const form = useFormContext<ZodInvoiceFormData>();

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "historicoFaturamentos",
	});

	return (
		<>
			{/* Section for New Readings and Consumption */}
			<section id="leituras-consumo" className="flex flex-col gap-4">
				<h3 className="font-semibold leading-7 mb-1">
					5. Leituras e Consumo Adicionais
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<FormField
						control={form.control}
						name="leituraAtualConsumo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Leitura Atual Consumo (kWh)</FormLabel>
								<FormControl>
									<Input type="number" placeholder="0" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="leituraAtualGeracao"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Leitura Atual Geração (kWh)</FormLabel>
								<FormControl>
									<Input type="number" placeholder="0" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="consumo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Consumo (kWh)</FormLabel>
								<FormControl>
									<Input type="number" placeholder="0" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</section>

			{/* Section for Tariff Flags */}
			<section id="bandeiras-tarifarias" className="flex flex-col gap-4">
				<h3 className="font-semibold leading-7 mb-1">
					6. Bandeiras Tarifárias
				</h3>
				{/* Bandeira Vermelha P1 */}
				<div className="flex flex-col gap-2 p-4 border rounded-md">
					<h4 className="font-medium text-sm">Bandeira Vermelha P1</h4>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<FormField
							control={form.control}
							name="tarifaBandVermelhaP1SI"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa SI (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tarifaBandVermelhaP1CI"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa CI (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tarifaBandVermelhaP1Compensavel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa Compensável (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				{/* Bandeira Vermelha P2 */}
				<div className="flex flex-col gap-2 p-4 border rounded-md">
					<h4 className="font-medium text-sm">Bandeira Vermelha P2</h4>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<FormField
							control={form.control}
							name="tarifaBandVermelhaP2SI"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa SI (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tarifaBandVermelhaP2CI"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa CI (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tarifaBandVermelhaP2Compensavel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa Compensável (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				{/* Bandeira Amarela */}
				<div className="flex flex-col gap-2 p-4 border rounded-md">
					<h4 className="font-medium text-sm">Bandeira Amarela</h4>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<FormField
							control={form.control}
							name="tarifaBandAmarelaSI"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa SI (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tarifaBandAmarelaCI"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa CI (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tarifaBandAmarelaCompensavel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarifa Compensável (R$)</FormLabel>
									<FormControl>
										<Input type="number" placeholder="0.00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</section>

			{/* Section for Billing History */}
			<section id="historico-faturamentos" className="flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<h3 className="font-semibold leading-7">
						7. Histórico de Faturamentos
					</h3>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() =>
							append({ dias: 0, energiaAtiva: 0, data: new Date() })
						}
					>
						Adicionar Histórico
					</Button>
				</div>
				<div className="flex flex-col gap-4">
					{fields.map((item, index) => (
						<div
							key={item.id}
							className="flex flex-col md:flex-row items-start gap-4 p-4 border rounded-md"
						>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
								<FormField
									control={form.control}
									name={`historicoFaturamentos.${index}.dias`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Dias</FormLabel>
											<FormControl>
												<Input type="number" placeholder="30" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`historicoFaturamentos.${index}.energiaAtiva`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Energia Ativa (kWh)</FormLabel>
											<FormControl>
												<Input type="number" placeholder="0" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`historicoFaturamentos.${index}.data`}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Data de leitura</FormLabel>
											<FormControl>
												<MonthPicker
													fromYear={new Date().getFullYear() - 20}
													toYear={new Date().getFullYear() + 10}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button
								type="button"
								variant="destructive"
								size="icon"
								onClick={() => remove(index)}
								className="mt-2 md:mt-6"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					))}
				</div>
			</section>
		</>
	);
};
