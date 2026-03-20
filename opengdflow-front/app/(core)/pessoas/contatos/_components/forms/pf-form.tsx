"use client";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useHookFormMask } from "use-mask-input";
import { AddressFormTabs } from "@/app/(core)/_components/address-form/tabs";
import { Datepicker } from "@/components/date-picker";
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
import { Separator } from "@/components/ui/separator";
import { deleteDocument } from "@/lib/services/documents/delete";
import { FileUploader } from "./file-uploader";
import type { ZodContactSchema } from "./zod-schemas";

export const PFForm = () => {
	const form = useFormContext<ZodContactSchema>();
	const registerWithMask = useHookFormMask(form.register);

	const { mutateAsync: handleDelete } = useMutation({
		mutationFn: (id: number) => deleteDocument(id),
		onSuccess: () => {
			toast.success("Documento excluído com sucesso!");
		},
		onError: (e) => {
			toast.error("Erro ao excluir documento!", {
				description: e.message ?? "",
			});
			console.error("[PFForm][deleteDocument]:", e);
			return e;
		},
	});

	const genericRgMasks = [
		"999.999-9", // For 7-digit RGs
		"9.999.999-9", // For 8-digit RGs
		"99.999.999-9", // For 9-digit RGs
	];

	return (
		<div className="flex flex-col gap-5">
			<section id="basic-info" className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="pessoaFisica.nome"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome completo</FormLabel>
							<FormControl>
								<Input placeholder="Nome" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-2 w-full items-start">
					<FormField
						control={form.control}
						name="pessoaFisica.rg"
						render={() => (
							<FormItem className="w-full">
								<FormLabel>RG</FormLabel>
								<FormControl>
									<Input
										placeholder="__.___.___-_"
										{...registerWithMask("pessoaFisica.rg", genericRgMasks)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pessoaFisica.cpf"
						render={() => (
							<FormItem className="w-full">
								<FormLabel>CPF</FormLabel>
								<FormControl>
									<Input
										placeholder="___.___.___-__"
										{...registerWithMask("pessoaFisica.cpf", "999.999.999-99")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex gap-2 w-full items-start">
					<FormField
						control={form.control}
						name="telefone"
						render={({ field: { ref, ...field } }) => (
							<FormItem className="w-full">
								<FormLabel>Telefone</FormLabel>
								<FormControl>
									<Input
										placeholder="(99) 9 9999-9999"
										{...registerWithMask("telefone", "(99) 9 9999-9999")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input placeholder="email@email.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex gap-2 w-full items-start">
					<FormField
						control={form.control}
						name="pessoaFisica.profissao"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Profissão</FormLabel>
								<FormControl>
									<Input placeholder="Profissão" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pessoaFisica.nacionalidade"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Nacionalidade</FormLabel>
								<FormControl>
									<Input placeholder="Nacionalidade" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex gap-2 w-full items-start">
					<FormField
						control={form.control}
						name="pessoaFisica.estadoCivil"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Estado civil</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Estado Civil" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="solteiro">Solteiro</SelectItem>
										<SelectItem value="casado">Casado</SelectItem>
										<SelectItem value="divorciado">Divorciado</SelectItem>
										<SelectItem value="viuvo">Viúvo</SelectItem>
										<SelectItem value="separado">Separado</SelectItem>
										<SelectItem value="amasiado">Amasiado</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="pessoaFisica.dataNascimento"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Data de nascimento</FormLabel>
								<FormControl>
									<Datepicker
										calendarProps={{
											fromYear: new Date().getFullYear() - 100,
											toYear: new Date().getFullYear(),
											defaultMonth: field.value,
										}}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</section>

			<Separator className="my-3" />

			<h3 className="font-semibold leading-7 mb-1">2. Localização</h3>
			<section id="localization" className="flex flex-col gap-4">
				<AddressFormTabs />
			</section>

			<Separator className="my-3" />

			<FileUploader.Context>
				<div className="flex justify-between items-center">
					<h3 className="font-semibold leading-7 mb-1">3. Documentos</h3>
					<FileUploader.Upload />
				</div>
				<section id="documents" className="flex flex-col gap-4">
					<FileUploader.List onDelete={handleDelete} />
				</section>
			</FileUploader.Context>
		</div>
	);
};
