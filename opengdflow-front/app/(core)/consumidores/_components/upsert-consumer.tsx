"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { type FC, type PropsWithChildren, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	consumerClassifications,
	consumerStatuses,
	consumerTypes,
} from "@/lib/models/consumer";
import { usinaTipoConexaoOptions } from "@/lib/models/usina";
import {
	cleanConsumerData,
	toggleOpenConsumerSheet,
} from "@/lib/redux/features/consumers/slice";
import { AddressFormTabs } from "../../_components/address-form/tabs";
import { FormSheet } from "../../_components/form-sheet";
import { InformacoesDistribuidora } from "../../_components/informacoes-distribuidora";
import { RepresentantesSelect } from "../../_components/representantes-select";
import { upsertConsumer } from "../_services/upsert";
import {
	type ZodConsumerFormData,
	zodConsumerSchema,
} from "./form-items/zod-schema";

const defaultValues: Partial<ZodConsumerFormData> = {
	addressType: "address",
};

export const UpsertConsumerSheet: FC<PropsWithChildren> = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.consumers.sheet.open);
	const editFormData = useAppSelector((state) => state.consumers.sheet.data);

	// Initialize the form with the correct schema based on mode
	const form = useForm<ZodConsumerFormData>({
		defaultValues,
		resolver: zodResolver(zodConsumerSchema),
	});

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanConsumerData());
		};
	}, []);

	useEffect(() => {
		if (open) {
			if (editFormData) {
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
					dataAssinaturaContrato: editFormData?.dataAssinaturaContrato
						? parseISO(editFormData?.dataAssinaturaContrato || "")
						: null,
				};
				form.reset(formattedData as unknown as ZodConsumerFormData);
			} else {
				form.reset(defaultValues);
			}
		} else {
			dispatch(cleanConsumerData());
			form.reset(defaultValues);
		}
	}, [open, editFormData, form, dispatch]);

	const { mutate } = useMutation({
		mutationFn: async (formData: ZodConsumerFormData) => {
			const formattedData = {
				...formData,
			};
			return await upsertConsumer(formattedData);
		},
		onSuccess: () => {
			toast.success("Consumidor criado com sucesso!");
			dispatch(toggleOpenConsumerSheet(false));
		},
		onError: (e) => {
			toast.error("Erro ao criar consumidor!", {
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
		{ id: "geracao-propria", label: "5. Geração Própria" },
	];

	const handleSubmit = (data: ZodConsumerFormData) => {
		mutate(data);
	};

	return (
		<FormSheet.Wrapper
			open={open}
			onOpenChange={(open) => dispatch(toggleOpenConsumerSheet(open))}
		>
			<FormSheet.Aside
				sections={sections}
				title={editFormData?.id ? "Editar Consumidor" : "Novo Consumidor"}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				onCancel={() => dispatch(toggleOpenConsumerSheet())}
				sections={sections}
			>
				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						1. Informações Básicas
					</h3>
					<div className="flex gap-2 items-start ">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Nome do consumidor</FormLabel>
									<FormControl>
										<Input placeholder="Nome do consumidor" {...field} />
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
										<Input placeholder="Unidade consumidora (UC)" {...field} />
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
								<FormItem className="w-1/2">
									<FormLabel>Classificação</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione a classificação" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(consumerClassifications).map(
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
							name="tipo"
							render={({ field }) => (
								<FormItem className="w-1/2">
									<FormLabel>Tipo de consumidor</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione o tipo" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(consumerTypes).map(([value, label]) => (
												<SelectItem key={value} value={value}>
													{label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-2 items-start gap-2">
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione o status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(consumerStatuses).map(
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
							name="dataAssinaturaContrato"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Data da assinatura do contrato</FormLabel>
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
					<div className="grid grid-cols-2 items-start gap-2">
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

				<section id="geracao-propria" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">5. Geração Própria</h3>
					<div className="grid grid-cols-2 items-start gap-2">
						<FormField
							control={form.control}
							name="geracaoPropria"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Geração Própria</FormLabel>
									<FormControl>
										<Input
											placeholder="Geração Própria"
											type="number"
											step="0.01"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="consumorReferenciaKwh"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Referência de Consumo (KWh)</FormLabel>
									<FormControl>
										<Input
											placeholder="Referência de Consumo (KWh)"
											step="0.01"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>
			</FormSheet.Form>
		</FormSheet.Wrapper>
	);
};
