import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	usinaTensaoConexaoOptions,
	usinaTipoConexaoOptions,
} from "@/lib/models/usina";
import type { ZodUsinaFormData } from "./zod-schema";

export const ConfigsTecnicas = () => {
	const form = useFormContext<ZodUsinaFormData>();

	return (
		<>
			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="demandaPonta"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">Demanda ponta (kW)</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									placeholder="Demanda ponta (kW)"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="demandaFPonta"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Demanda fora ponta (kW)
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									placeholder="Demanda fora ponta (kW)"
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
					name="potenciaNominal"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Potência nominal (kW)
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									placeholder="Potência nominal (kW)"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pontenciaPico"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">
								Potência de pico (kW)
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									placeholder="Potência de pico (kW)"
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
					name="tensaoConexao"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Tensão de conexão</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="w-full" {...field}>
										<SelectValue placeholder="Selecione" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.entries(usinaTensaoConexaoOptions).map(
										([value, label]) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										),
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tipoConexao"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Tipo de conexão</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="w-full" {...field}>
										<SelectValue placeholder="Selecione" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.entries(usinaTipoConexaoOptions).map(
										([value, label]) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										),
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	);
};
