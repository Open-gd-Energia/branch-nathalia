"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { type FC, type PropsWithChildren, useEffect, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	cleanInvoiceData,
	toggleOpenInvoiceSheet,
} from "@/lib/redux/features/invoices/slice";
import { FormSheet } from "../../_components/form-sheet";
import { upsertInvoice } from "../_services/upsert";
import { AdditionalFields } from "./form-components/additional-fields";
import { ConsumidorSelect } from "./form-components/consumidor-select";
import { DadosTarifariosFields } from "./form-components/dados-tarifarios-fields";
import { DatesSelect } from "./form-components/dates-select";
import { DiscountAddItems } from "./form-components/discount-add-items";
import { FileInput } from "./form-components/file-input";
import { LeiturasSelect } from "./form-components/leituras-select";
import { UsinaSelect } from "./form-components/usina-select";
import {
	type ZodInvoiceFormData,
	zodInvoiceSchema,
} from "./form-components/zod-schemas";

export interface UpsertInvoiceSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertInvoiceSheet: FC<UpsertInvoiceSheetProps> = ({
	onSuccess,
	onClose,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.invoices.sheet.open);
	const editFormData = useAppSelector((state) => state.invoices.sheet.data);
	const initialTab = editFormData
		? editFormData?.consumidor
			? "consumidor"
			: "usina"
		: "usina";
	const [tipoFaturaSelected, setTipoFaturaSelected] = useState(initialTab);

	// Initialize the form with the correct schema based on mode
	const form = useForm<ZodInvoiceFormData>({
		resolver: zodResolver(zodInvoiceSchema),
	});

	useEffect(() => {
		setTipoFaturaSelected(initialTab);
	}, [initialTab]);

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset({});
			dispatch(cleanInvoiceData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			const transformedData = {
				...editFormData,
				mesReferencia: editFormData.mesReferencia
					? parseISO(editFormData.mesReferencia)
					: new Date(),
				vencimento: editFormData.vencimento
					? parseISO(editFormData.vencimento)
					: new Date(),
				dataLeituraAtual: editFormData.dataLeituraAtual
					? parseISO(editFormData.dataLeituraAtual)
					: new Date(),
				proximaLeitura: editFormData.proximaLeitura
					? parseISO(editFormData.proximaLeitura)
					: new Date(),
				historicoFaturamentos: editFormData.historicoFaturamentos
					? editFormData.historicoFaturamentos.map((item) => ({
							...item,
							data: item.data ? parseISO(item.data) : undefined,
						}))
					: [],
			};
			form.reset(transformedData as unknown as ZodInvoiceFormData);
		}

		if (!open) {
			form.reset({});
			dispatch(cleanInvoiceData());
		}
	}, [editFormData, open]);

	const { mutate } = useMutation({
		mutationFn: async (formData: ZodInvoiceFormData) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			return await upsertInvoice(formData as any);
		},
		onSuccess: () => {
			toast.success("Fatura criada com sucesso!");
			dispatch(toggleOpenInvoiceSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar fatura!", {
				description: e.message,
			});
		},
	});

	const sections = [
		{ id: "basic-info", label: "1. Informações Básicas" },
		{ id: "valores-geracao", label: "2. Valores de Geração e Consumo" },
		{ id: "dados-tarifarios", label: "3. Dados Tarifários" },
		{ id: "calculos-detalhados", label: "4. Cálculos Detalhados" },
		{
			id: "leituras-consumo-adicional",
			label: "5. Leituras e Consumo Adicional",
		},
		{
			id: "bandeiras-tarifarias",
			label: "6. Bandeiras Tarifárias",
		},
		{
			id: "historico-faturamentos",
			label: "7. Histórico de Faturamentos",
		},
		{ id: "observacoes", label: "8. Observações" },
	];

	const handleSubmit = (data: ZodInvoiceFormData) => {
		mutate(data);
	};

	const handleClose = () => {
		dispatch(toggleOpenInvoiceSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenInvoiceSheet(open));
		if (!open) {
			onClose?.();
		}
	};

	const handleTipoChange = (value: string) => {
		setTipoFaturaSelected(value);
		form.resetField("energiaDistribuida");
		form.resetField("consumoLocalUsina");
		if (value === "usina") {
			form.resetField("consumidor");
			form.resetField("unidadeConsumidoraConsumidor");
		} else {
			form.resetField("usina");
			form.resetField("unidadeConsumidoraUsina");
		}
	};

	return (
		<FormSheet.Wrapper open={open} onOpenChange={handleOpenChange}>
			<FormSheet.Aside
				sections={sections}
				title={editFormData?.id ? "Editar Fatura" : "Nova Fatura"}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				sections={sections}
				onCancel={handleClose}
			>
				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						1. Informações Básicas
					</h3>
					<FileInput />
					<FormField
						control={form.control}
						name="numeroFatura"
						render={({ field }) => (
							<FormItem className="w-1/2">
								<FormLabel>Nº da fatura</FormLabel>
								<FormControl>
									<Input placeholder="99999" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Tabs
						defaultValue={tipoFaturaSelected}
						onValueChange={handleTipoChange}
					>
						<TabsList>
							<TabsTrigger disabled={Boolean(editFormData?.id)} value="usina">
								Usina
							</TabsTrigger>
							<TabsTrigger
								disabled={Boolean(editFormData?.id)}
								value="consumidor"
							>
								Consumidor
							</TabsTrigger>
						</TabsList>
						<TabsContent value="usina">
							<UsinaSelect />
						</TabsContent>
						<TabsContent value="consumidor">
							<ConsumidorSelect />
						</TabsContent>
					</Tabs>
					<DatesSelect />
					<LeiturasSelect />
				</section>

				<Separator className="my-3" />

				<section id="valores-geracao" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						2. Valores de Geração e Consumo
					</h3>
					<div className="grid grid-cols-2 gap-2 items-start">
						<FormField
							control={form.control}
							name="energiaInjetada"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Energia injetada (kWh)</FormLabel>
									<FormControl>
										<Input
											placeholder="Energia injetada (kWh)"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{tipoFaturaSelected === "usina" ? (
							<FormField
								control={form.control}
								name="consumoLocalUsina"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Consumo (kWh)</FormLabel>
										<FormControl>
											<Input
												placeholder="Consumo (kWh)"
												type="number"
												{...field}
												value={field.value ?? undefined}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : (
							<FormField
								control={form.control}
								name="energiaConpensadaLocal"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Energia local compensada (kWh)</FormLabel>
										<FormControl>
											<Input
												placeholder="Energia local compensada (kWh)"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
					{tipoFaturaSelected === "usina" && (
						<div className="flex gap-2 items-start">
							<FormField
								control={form.control}
								name="saldoAcumuladoAnterior"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Saldo acumulado anterior (kWh)</FormLabel>
										<FormControl>
											<Input
												placeholder="Saldo acumulado anterior (kWh)"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="saldoAcumuladoAtual"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Saldo acumulado atual (kWh)</FormLabel>
										<FormControl>
											<Input
												placeholder="Saldo acumulado atual (kWh)"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					)}
					{tipoFaturaSelected === "usina" && (
						<div className="grid grid-cols-2 gap-2 items-start">
							<FormField
								control={form.control}
								name="energiaConpensadaLocal"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Energia local compensada (kWh)</FormLabel>
										<FormControl>
											<Input
												placeholder="Energia local compensada (kWh)"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="energiaDistribuida"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Energia distribuída (kWh)</FormLabel>
										<FormControl>
											<Input
												placeholder="Energia distribuída (kWh)"
												type="number"
												{...field}
												value={field.value ?? undefined}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					)}
				</section>

				<Separator className="my-3" />

				<section id="dados-tarifarios" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">3. Dados Tarifários</h3>
					<DadosTarifariosFields />
				</section>

				<Separator className="my-3" />

				<section id="calculos-detalhados" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						4. Cálculos Detalhados
					</h3>

					<div className="grid grid-cols-2 gap-2 items-start">
						<FormField
							control={form.control}
							name="valorTotalFatura"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Valor total da fatura (R$)</FormLabel>
									<FormControl>
										<Input
											placeholder="Valor total da fatura (R$)"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="valorEnergiaCompensada"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Energia compensada (kWh)</FormLabel>
									<FormControl>
										<Input
											placeholder="Energia compensada (kWh)"
											type="number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{tipoFaturaSelected === "consumidor" && (
						<div className="flex gap-2 items-start">
							<FormField
								control={form.control}
								name="saldoAcumuladoAnterior"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Saldo acumulado anterior (kWh)</FormLabel>
										<FormControl>
											<Input
												placeholder="Saldo acumulado anterior (kWh)"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="saldoAcumuladoAtual"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Saldo acumulado atual (kWh)</FormLabel>
										<FormControl>
											<Input
												placeholder="Saldo acumulado atual (kWh)"
												type="number"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					)}

					{tipoFaturaSelected === "usina" && (
						<FormField
							control={form.control}
							name="creditoDistribuidos"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Créditos distribuídos (kWh)</FormLabel>
									<FormControl>
										<Input
											placeholder="Créditos distribuídos (kWh)"
											type="number"
											step={0.01}
											{...field}
											value={field.value ?? undefined}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					<DiscountAddItems />
				</section>

				<Separator className="my-3" />

				<section
					id="leituras-consumo-adicional"
					className="flex flex-col gap-4"
				>
					<AdditionalFields />
				</section>

				<Separator className="my-3" />

				<section id="observacoes" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">8. Observações</h3>
					<FormField
						control={form.control}
						name="observacao"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Descrição</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			</FormSheet.Form>
		</FormSheet.Wrapper>
	);
};
