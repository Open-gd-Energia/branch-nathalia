import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { SearchSelect } from "@/components/search-select";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchBancos } from "@/lib/services/bancos/fetch";
import type { ZodUsinaFormData } from "./zod-schema";

export const DadosBancarios = () => {
	const form = useFormContext<ZodUsinaFormData>();
	const registerWithMask = useHookFormMask(form.register);

	const { data: bancos, isLoading: loadingBanco } = useQuery({
		queryKey: ["banco-list"],
		queryFn: () => fetchBancos({}),
	});

	return (
		<>
			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="conta.nomeTitular"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">Nome do titular</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Nome do titular" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="conta.cpfCnpjTitular"
					render={() => (
						<FormItem className="w-full">
							<FormLabel>CPF/CNPJ do titular</FormLabel>
							<FormControl>
								<Input
									placeholder="CPF/CNPJ do titular"
									{...registerWithMask("conta.cpfCnpjTitular", [
										"999.999.999-99",
										"99.999.999/9999-99",
									])}
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
					name="conta.banco"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">Banco</FormLabel>
							<FormControl>
								<SearchSelect
									multiple={false}
									options={bancos || []}
									onValueChange={field.onChange}
									value={field.value}
									loading={loadingBanco}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="w-full" />
			</div>
			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="conta.agencia"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">Agência</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Agência" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="conta.conta"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel className="line-clamp-1">Conta</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Conta" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name="conta.chavePix"
				render={({ field }) => (
					<FormItem className="w-full">
						<FormLabel className="line-clamp-1">Chave Pix (Opcional)</FormLabel>
						<FormControl>
							<Input {...field} placeholder="Conta" value={field.value ?? ""} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
