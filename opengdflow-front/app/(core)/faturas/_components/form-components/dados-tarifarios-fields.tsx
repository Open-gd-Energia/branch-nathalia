import type { FC, PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ZodInvoiceFormData } from "./zod-schemas";

const ItemsRow: FC<PropsWithChildren> = ({ children }) => {
	return <div className="flex items-start gap-2">{children}</div>;
};

export const DadosTarifariosFields = () => {
	const form = useFormContext<ZodInvoiceFormData>();

	return (
		<>
			<h3 className="text-sm font-medium leading-5">Tarifas</h3>

			<section className="flex flex-col gap-4">
				<ItemsRow>
					<FormField
						control={form.control}
						name="tarifaTESI"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa TESI (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa TESI (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tarifaTUSDSI"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa TUSDSI (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa TUSDSI (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tarifaTotalSI"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa total SI (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa total SI (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</ItemsRow>
				<ItemsRow>
					<FormField
						control={form.control}
						name="tarifaTECI"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa TECI (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa TECI (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tarifaTUSDCI"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa TUSDCI (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa TUSDCI (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tarifaTotalCI"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa total CI (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa total CI (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</ItemsRow>
				<ItemsRow>
					<FormField
						control={form.control}
						name="tarifaTECompensavel"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa TE compensável (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa TE compensável (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tarifaTUSDCompensavel"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa TUSD compensável (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa TUSD compensável (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tarifaTotalCompensavel"
						render={({ field }) => (
							<FormItem className="w-1/3">
								<FormLabel>Tarifa total compensável (R$/kWh)</FormLabel>
								<FormControl>
									<Input
										placeholder="Tarifa total compensável (R$/kWh)"
										type="number"
										step={0.0001}
										min={0}
										inputMode="decimal"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</ItemsRow>
			</section>

			<h3 className="text-sm font-medium leading-5">Tributos</h3>

			<ItemsRow>
				<FormField
					control={form.control}
					name="valorIcms"
					render={({ field }) => (
						<FormItem className="w-1/3">
							<FormLabel>ICMS (%)</FormLabel>
							<FormControl>
								<Input placeholder="ICMS (%)" type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="valorPis"
					render={({ field }) => (
						<FormItem className="w-1/3">
							<FormLabel>PIS (%)</FormLabel>
							<FormControl>
								<Input placeholder="PIS (%)" type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="valorConfins"
					render={({ field }) => (
						<FormItem className="w-1/3">
							<FormLabel>COFINS (%)</FormLabel>
							<FormControl>
								<Input placeholder="COFINS (%)" type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</ItemsRow>
		</>
	);
};
