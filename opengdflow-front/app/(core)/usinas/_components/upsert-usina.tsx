"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { type FC, type PropsWithChildren, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	type UsinaRequest,
	usinaClassificacaoOptions,
	usinaStatusesOptions,
} from "@/lib/models/usina";
import {
	cleanUsinaData,
	toggleOpenUsinaSheet,
} from "@/lib/redux/features/usinas/slice";
import { AddressFormTabs } from "../../_components/address-form/tabs";
import { FormSheet } from "../../_components/form-sheet";
import { InformacoesDistribuidora } from "../../_components/informacoes-distribuidora";
import { RepresentantesSelect } from "../../_components/representantes-select";
import { upsertUsina } from "../_services/upsert";
import { ConfigsFaturamento } from "./form-items/configs-faturamento";
import { ConfigsTecnicas } from "./form-items/configs-tecnicas";
import { DadosBancarios } from "./form-items/dados-bancarios";
import { DatesSelect } from "./form-items/dates";
import { type ZodUsinaFormData, zodUsinaSchema } from "./form-items/zod-schema";

const defaultValues: Partial<ZodUsinaFormData> = {
	addressType: "address",
};

export const UpsertUsinaSheet: FC<PropsWithChildren> = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.usinas.sheet.open);
	const editFormData = useAppSelector((state) => state.usinas.sheet.data);

	// Initialize the form with the correct schema based on mode
	const form = useForm<ZodUsinaFormData>({
		defaultValues,
		resolver: zodResolver(zodUsinaSchema),
	});

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanUsinaData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			// need to format data to adapt the current schema
			const formattedData = {
				...editFormData,
				addressType: editFormData?.endereco?.latitude
					? "coordinates"
					: "address",
				representantes: editFormData?.representantes?.map(
					({ representante, relacao }) => ({
						relacao,
						representante: {
							...representante,
							nome:
								representante?.pessoaFisica?.nome ||
								representante?.pessoaJuridica?.razaoSocial,
						},
					}),
				),
				representanteTitular: {
					...editFormData?.representanteTitular,
					nome:
						editFormData?.representanteTitular?.pessoaFisica?.nome ||
						editFormData?.representanteTitular?.pessoaJuridica?.razaoSocial,
				},
				dataPrevistaLeitura: editFormData?.dataPrevistaLeitura
					? parseISO(editFormData?.dataPrevistaLeitura)
					: undefined,
				dataPrimeiraInjecao: editFormData?.dataPrimeiraInjecao
					? parseISO(editFormData?.dataPrimeiraInjecao)
					: undefined,
				dataPrimeiroCadastro: editFormData?.dataPrimeiroCadastro
					? parseISO(editFormData?.dataPrimeiroCadastro)
					: undefined,
				dataTrocaTitularidade: editFormData?.dataTrocaTitularidade
					? parseISO(editFormData?.dataTrocaTitularidade)
					: undefined,
			};

			form.reset(formattedData as unknown as ZodUsinaFormData);
		}

		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanUsinaData());
		}
	}, [editFormData, open]);

	const { mutate } = useMutation({
		mutationFn: async (formData: ZodUsinaFormData) => {
			const formattedData = {
				...formData,
			};
			return await upsertUsina(formattedData as unknown as UsinaRequest);
		},
		onSuccess: () => {
			toast.success("Usina criada com sucesso!");
			dispatch(toggleOpenUsinaSheet(false));
		},
		onError: (e) => {
			toast.error("Erro ao criar Usina!", {
				description: e.message,
			});
		},
	});

	const sections = [
		{ id: "basic-info", label: "1. Informações Básicas" },
		{ id: "localizacao", label: "2. Localização" },
		{ id: "representantes", label: "3. Representantes" },
		{
			id: "informacoes-distribuidora",
			label: "4. Informações da Distribuidora",
		},
		{ id: "configs-tecnicas", label: "5. Configurações Técnicas" },
		{ id: "configs-faturamento", label: "6. Configurações de Faturamento" },
		{ id: "datas", label: "7. Datas" },
		{ id: "dados-bancarios", label: "8. Dados Bancários" },
	];

	const handleSubmit = (data: ZodUsinaFormData) => {
		mutate(data);
	};

	return (
		<FormSheet.Wrapper
			open={open}
			onOpenChange={(open) => dispatch(toggleOpenUsinaSheet(open))}
		>
			<FormSheet.Aside
				sections={sections}
				title={editFormData?.id ? "Editar Usina" : "Nova Usina"}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				onCancel={() => dispatch(toggleOpenUsinaSheet())}
				sections={sections}
			>
				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						1. Informações Básicas
					</h3>
					<div className="flex gap-2 items-start">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Nome da usina</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Nome" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="uc"
							render={({ field }) => (
								<FormItem className="w-1/4">
									<FormLabel className="line-clamp-1">
										Unidade consumidora (UC)
									</FormLabel>
									<FormControl>
										<Input {...field} placeholder="UC" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex gap-2 items-start">
						<FormField
							control={form.control}
							name="classificacao"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Subgrupo</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(usinaClassificacaoOptions).map(
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
							name="status"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Status</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(usinaStatusesOptions).map(
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
				</section>

				<Separator className="my-3" />
				<section id="localizacao" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">2. Localização</h3>
					<AddressFormTabs />
				</section>

				<Separator className="my-3" />

				<section id="representantes" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">3. Representantes</h3>
					<RepresentantesSelect />
				</section>

				<Separator className="my-3" />

				<section id="informacoes-distribuidora" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						4. Informações da Distribuidora
					</h3>
					<InformacoesDistribuidora />
				</section>

				<Separator className="my-3" />

				<section id="configs-tecnicas" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						5. Configurações Técnicas
					</h3>
					<ConfigsTecnicas />
				</section>

				<Separator className="my-3" />

				<section id="configs-faturamento" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						6. Configurações de Faturamento
					</h3>
					<ConfigsFaturamento />
				</section>

				<Separator className="my-3" />

				<section id="datas" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">7. Datas</h3>
					<DatesSelect />
				</section>

				<Separator className="my-3" />

				<section id="dados-bancarios" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">8. Dados Bancários</h3>
					<DadosBancarios />
				</section>
			</FormSheet.Form>
		</FormSheet.Wrapper>
	);
};
