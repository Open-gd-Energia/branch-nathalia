import { useFormContext } from "react-hook-form";
import { Datepicker } from "@/components/date-picker";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { ZodInvoiceFormData } from "./zod-schemas";

export const LeiturasSelect = () => {
	const form = useFormContext<ZodInvoiceFormData>();

	return (
		<div className="flex gap-2 items-start">
			<FormField
				control={form.control}
				name="dataLeituraAtual"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Data de leitura atual</FormLabel>
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
			<FormField
				control={form.control}
				name="proximaLeitura"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel>Data da próxima leitura</FormLabel>
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
