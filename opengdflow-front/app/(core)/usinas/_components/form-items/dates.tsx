import { useFormContext } from "react-hook-form";
import { Datepicker } from "@/components/date-picker";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { ZodUsinaFormData } from "./zod-schema";

export const DatesSelect = () => {
	const form = useFormContext<ZodUsinaFormData>();

	return (
		<>
			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="dataPrimeiraInjecao"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Primeira injeção</FormLabel>
							<FormControl>
								<Datepicker
									calendarProps={{
										fromYear: new Date().getFullYear() - 50,
										toYear: new Date().getFullYear() + 10,
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
					name="dataTrocaTitularidade"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Troca de titularidade</FormLabel>
							<FormControl>
								<Datepicker
									calendarProps={{
										fromYear: new Date().getFullYear() - 50,
										toYear: new Date().getFullYear() + 10,
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

			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="dataPrimeiroCadastro"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Primeiro cadastro</FormLabel>
							<FormControl>
								<Datepicker
									calendarProps={{
										fromYear: new Date().getFullYear() - 50,
										toYear: new Date().getFullYear() + 10,
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
					name="dataPrevistaLeitura"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Previsão de leitura</FormLabel>
							<FormControl>
								<Datepicker
									calendarProps={{
										fromYear: new Date().getFullYear() - 50,
										toYear: new Date().getFullYear() + 10,
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
		</>
	);
};
