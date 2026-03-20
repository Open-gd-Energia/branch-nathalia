import { useFormContext } from "react-hook-form";
import { Datepicker } from "@/components/date-picker";
import { MonthPicker } from "@/components/month-picker";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { ZodInvoiceFormData } from "./zod-schemas";

export const DatesSelect = () => {
	const form = useFormContext<ZodInvoiceFormData>();

	return (
		<div className="flex gap-2 items-start">
			<FormField
				control={form.control}
				name="mesReferencia"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Mês de referência</FormLabel>
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
			<FormField
				control={form.control}
				name="vencimento"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Data de vencimento</FormLabel>
						<FormControl>
							<Datepicker
								calendarProps={{
									fromYear: new Date().getFullYear() - 10,
									toYear: new Date().getFullYear() + 50,
								}}
								placeholder="Selecione uma data"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};
