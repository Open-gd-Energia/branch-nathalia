"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	discountApplicationOptions,
	economySubtractedOptions,
	toBeChargedOptions,
} from "@/lib/models/discount-types";
import {
	cleanDiscountTypesData,
	toggleOpenDiscountTypesSheet,
} from "@/lib/redux/features/discount-types/slice";
import { z } from "@/lib/zod-translation";
import { FormSheet } from "../../../_components/form-sheet";
import { upsertDiscountType } from "../_services/upsert";

const allKeys = [
	...new Set([
		...Object.keys(discountApplicationOptions),
		...Object.keys(economySubtractedOptions),
		...Object.keys(toBeChargedOptions),
	]),
] as [string, ...string[]];

const discountTypeSchema = z.object({
	id: z.number().optional(),
	nome: z.string().min(1),
	descricao: z.string().optional(),
	itens: z
		.array(
			z
				.object({
					tipo: z.enum(allKeys).optional().nullable(),
					nome: z.string().optional().nullable(),
					valorTipo: z.enum(["FIXO", "PERCENTUAL"]).optional().nullable(),
					valor: z.number().optional().nullable(),
				})
				.optional(),
		)
		.optional(),
});

type DiscountTypeForm = z.infer<typeof discountTypeSchema>;
const defaultValues: DiscountTypeForm = {
	nome: "",
	descricao: "",
	itens: [
		{
			valor: 0,
			valorTipo: "FIXO",
			nome: "economia-subtraida",
		},
		{
			valor: 0,
			valorTipo: "FIXO",
			nome: "aplicacao-desconto",
		},
		{
			valor: 0,
			valorTipo: "FIXO",
			nome: "energia-cobrada",
		},
	],
};

export interface UpsertDiscountTypesSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertDiscountTypeSheet: FC<UpsertDiscountTypesSheetProps> = ({
	onSuccess,
	onClose,
}) => {
	const form = useForm<DiscountTypeForm>({
		defaultValues,
		resolver: zodResolver(discountTypeSchema),
	});

	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.discountTypes.sheet.open);
	const editFormData = useAppSelector(
		(state) => state.discountTypes.sheet.data,
	);

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanDiscountTypesData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			const sortedItens = [...(editFormData.itens || [])].sort((a, b) => {
				const order = {
					"economia-subtraida": 0,
					"aplicacao-desconto": 1,
					"energia-cobrada": 2,
				};
				return (
					(order[a.nome as keyof typeof order] ?? 0) -
					(order[b.nome as keyof typeof order] ?? 0)
				);
			});
			form.reset({
				...editFormData,
				itens: sortedItens,
			});
		}

		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanDiscountTypesData());
		}
	}, [editFormData, open]);

	const { mutate } = useMutation({
		mutationFn: async (data: DiscountTypeForm) =>
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			upsertDiscountType(data as any),
		onSuccess: () => {
			toast.success("Tipo de desconto criado com sucesso!");
			dispatch(toggleOpenDiscountTypesSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar Tipo de desconto!", {
				description: e.message,
			});
			console.error("[createDiscountTypes]:", e);
		},
	});

	const handleSubmit = (data: DiscountTypeForm) => {
		mutate(data);
	};

	const handleClose = () => {
		dispatch(toggleOpenDiscountTypesSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenDiscountTypesSheet(open));
		if (!open) {
			onClose?.();
		}
	};

	const sections = [{ id: "basic-info", label: "1. Informações Básicas" }];

	return (
		<FormSheet.Wrapper open={open} onOpenChange={handleOpenChange}>
			<FormSheet.Aside
				sections={sections}
				title={
					editFormData?.id ? "Editar Tipo de Desconto" : "Novo Tipo de Desconto"
				}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				onCancel={handleClose}
				sections={sections}
			>
				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						1. Informações Básicas
					</h3>
					<FormField
						control={form.control}
						name="nome"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Nome do tipo de desconto</FormLabel>
								<FormControl>
									<Input placeholder="Nome do tipo de desconto" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="itens.0.tipo"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									Valor a qual será subtraída a economia (R$)
								</FormLabel>
								<div className="grid grid-cols-[minmax(0,_1fr)_100px_minmax(0,_1fr)] gap-2">
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value ?? ""}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(economySubtractedOptions).map(
												([key, value]) => (
													<SelectItem key={key} value={key}>
														{value}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>

									<div />

									<FormField
										control={form.control}
										name="itens.0.valor"
										render={({ field }) => (
											<FormControl>
												<Input
													type="number"
													step={"0.01"}
													placeholder="valor"
													{...field}
													value={field.value ?? ""}
													onChange={(e) =>
														field.onChange(Number(e.target.value))
													}
												/>
											</FormControl>
										)}
									/>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="itens.1.tipo"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Aplicação do desconto</FormLabel>
								<div className="grid grid-cols-[minmax(0,_1fr)_100px_minmax(0,_1fr)] gap-2">
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value ?? ""}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(discountApplicationOptions).map(
												([key, value]) => (
													<SelectItem key={key} value={key}>
														{value}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>

									<FormField
										control={form.control}
										name="itens.1.valorTipo"
										render={({ field }) => (
											<Tabs
												defaultValue={field.value ?? "FIXO"}
												onValueChange={field.onChange}
												value={field.value ?? "FIXO"}
											>
												<TabsList className="h-9 w-full">
													<TabsTrigger value="FIXO">R$</TabsTrigger>
													<TabsTrigger value="PERCENTUAL">%</TabsTrigger>
												</TabsList>
											</Tabs>
										)}
									/>

									<FormField
										control={form.control}
										name="itens.1.valor"
										render={({ field }) => (
											<FormControl>
												<Input
													type="number"
													placeholder="valor"
													step={"0.01"}
													{...field}
													value={field.value ?? ""}
													onChange={(e) =>
														field.onChange(Number(e.target.value))
													}
												/>
											</FormControl>
										)}
									/>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="itens.2.tipo"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Energia cobrada (kWh)</FormLabel>
								<div className="grid grid-cols-[minmax(0,_1fr)_100px_minmax(0,_1fr)] gap-2">
									<Select
										onValueChange={(value) => {
											if (value !== "VALOR_FIXO") {
												form.setValue("itens.2.valor", null);
											}
											return field.onChange(value);
										}}
										defaultValue={field.value ?? ""}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(toBeChargedOptions).map(
												([key, value]) => (
													<SelectItem key={key} value={key}>
														{value}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>

									<div />

									{form.watch("itens.2.tipo") === "VALOR_FIXO" ? (
										<FormField
											control={form.control}
											name="itens.2.valor"
											render={({ field }) => (
												<FormControl>
													<Input
														type="number"
														step={"0.01"}
														placeholder="valor"
														{...field}
														value={field.value ?? ""}
														onChange={(e) =>
															field.onChange(Number(e.target.value))
														}
													/>
												</FormControl>
											)}
										/>
									) : (
										<div />
									)}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="descricao"
						render={({ field }) => (
							<FormItem>
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
