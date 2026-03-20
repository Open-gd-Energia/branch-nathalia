"use client";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useMaskInput } from "use-mask-input";
import { AddressFormTabs } from "@/app/(core)/_components/address-form/tabs";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { deleteDocument } from "@/lib/services/documents/delete";
import { FileUploader } from "./file-uploader";
import type { ZodContactSchema } from "./zod-schemas";

export const PJForm = () => {
	const form = useFormContext<ZodContactSchema>();

	const { mutateAsync: handleDelete } = useMutation({
		mutationFn: (id: number) => deleteDocument(id),
		onSuccess: () => {
			toast.success("Documento excluído com sucesso!");
		},
		onError: (e) => {
			toast.error("Erro ao excluir documento!", {
				description: e.message ?? "",
			});
			console.error("[PJForm][deleteDocument]:", e);
			return e;
		},
	});

	const cnpjInputRef = useMaskInput({ mask: "**.***.***/****-**" });
	const phoneInputRef = useMaskInput({ mask: "(99) 9 9999-9999" });

	return (
		<div className="flex flex-col gap-5">
			<section id="basic-info" className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="pessoaJuridica.razaoSocial"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Razão social</FormLabel>
							<FormControl>
								<Input placeholder="Razão social" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pessoaJuridica.nomeFantasia"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome fantasia</FormLabel>
							<FormControl>
								<Input placeholder="Nome fantasia" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-2 w-full items-start">
					<FormField
						control={form.control}
						name="pessoaJuridica.cnpj"
						render={({ field }) => {
							return (
								<FormItem className="w-full">
									<FormLabel>CNPJ</FormLabel>
									<FormControl>
										<Input
											placeholder="__.___.___/____-__"
											{...field}
											ref={cnpjInputRef}
											value={field.value ?? undefined}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						control={form.control}
						name="pessoaJuridica.inscricaoEstadual"
						render={({ field }) => {
							return (
								<FormItem className="w-full">
									<FormLabel>Inscrição estadual</FormLabel>
									<FormControl>
										<Input
											placeholder="Inscrição estadual"
											{...field}
											value={field.value ?? undefined}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>

				<div className="flex gap-2 w-full items-start">
					<FormField
						control={form.control}
						name="telefone"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Telefone comercial</FormLabel>
								<FormControl>
									<Input
										placeholder="(99) 9 9999-9999"
										{...field}
										ref={phoneInputRef}
										value={field.value ?? undefined}
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
								<FormLabel>E-mail corporativo</FormLabel>
								<FormControl>
									<Input placeholder="email@email.com" {...field} />
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
