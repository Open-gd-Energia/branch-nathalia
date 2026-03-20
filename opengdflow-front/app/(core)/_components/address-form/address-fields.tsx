import { useMutation } from "@tanstack/react-query";
import isEmpty from "lodash.isempty";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useHookFormMask } from "use-mask-input";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchByCep } from "@/lib/services/fetch-by-cep";
import type { AddressSchema } from "./zod-schema";

export const AddressFields = () => {
	const form = useFormContext<AddressSchema>();
	const registerWithMask = useHookFormMask(form.register);
	const [camposEditaveis, setCamposEditaveis] = useState({
		logradouro: false,
		bairro: false,
		uf: false,
	});

	const { mutate: fetchCep, isPending } = useMutation({
		mutationFn: fetchByCep,
		onError: (error) => {
			toast.error("Erro ao buscar CEP!", { description: error.message });
			setCamposEditaveis({
				logradouro: false,
				bairro: false,
				uf: false,
			});
		},
		onSuccess: (data) => {
			// Verificar quais campos estão vazios na resposta da API
			setCamposEditaveis({
				logradouro: isEmpty(data.logradouro),
				bairro: isEmpty(data.bairro),
				uf: isEmpty(data.uf),
			});

			form.setValue("endereco", {
				...form.getValues("endereco"),
				endereco: data.logradouro || "",
				bairro: data.bairro || "",
				cidade: {
					// id: data.ibge,
					idIbge: data.ibge,
					nome: data.localidade,
					uf: data.uf || "",
				},
			});
			form.clearErrors();
		},
	});

	const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const cep = e.target.value.replace(/\D/g, "");

		if (cep.length === 8) {
			fetchCep(cep);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<FormField
				control={form.control}
				name="endereco.cep"
				render={() => (
					<FormItem className="w-1/2">
						<FormLabel>CEP</FormLabel>
						<FormControl>
							<div className="flex gap-2 items-center mb-1">
								<Input
									placeholder="__.___-___"
									{...registerWithMask("endereco.cep", ["99.999-999"], {
										onChange: (data) => {
											handleCepChange(data);
										},
									})}
								/>
								{isPending && (
									<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
								)}
							</div>
						</FormControl>
						<p className="text-xs text-muted-foreground">
							Digite o CEP para preencher os campos automaticamente
						</p>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="flex gap-2 items-start">
				<FormField
					control={form.control}
					name="endereco.endereco"
					render={({ field }) => (
						<FormItem className="w-4/5">
							<FormLabel>Rua</FormLabel>
							<FormControl>
								<Input
									placeholder="Rua"
									disabled={!camposEditaveis.logradouro}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="endereco.numero"
					render={({ field }) => (
						<FormItem className="w-1/5">
							<FormLabel>Número</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value ?? undefined}
									placeholder="Número"
									type="number"
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
					name="endereco.bairro"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Bairro</FormLabel>
							<FormControl>
								<Input
									placeholder="Bairro"
									disabled={!camposEditaveis.bairro}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="endereco.complemento"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Complemento</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Complemento"
									value={field.value || ""}
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
					name="endereco.cidade.nome"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Cidade</FormLabel>
							<FormControl>
								<Input placeholder="Cidade" disabled {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="endereco.cidade.uf"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Estado</FormLabel>
							<FormControl>
								<Input
									placeholder="Estado"
									disabled={!camposEditaveis.uf}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
};
