"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSheet } from "@/app/(core)/_components/form-sheet";
import { Datepicker } from "@/components/date-picker";
import { MonthPicker } from "@/components/month-picker";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { Usina } from "@/lib/models/usina";
import {
	cleanGeracaoData,
	toggleOpenGeracaoSheet,
} from "@/lib/redux/features/geracao/slice";
import { upsertGeracao } from "../_services/upsert";
import { type ZodGeracaoFormData, zodGeracaoSchema } from "./zod-schema";

export interface UpsertGeracaoSheetProps {
	usina: Usina;
}

export const UpsertGeracaoSheet: FC<UpsertGeracaoSheetProps> = ({ usina }) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.geracao.sheet.open);
	const editFormData = useAppSelector((state) => state.geracao.sheet.data);
	const defaultValues: Partial<ZodGeracaoFormData> = {
		usina: {
			id: usina.id as number,
		},
	};

	// Initialize the form with the correct schema based on mode
	const form = useForm<ZodGeracaoFormData>({
		defaultValues,
		resolver: zodResolver(zodGeracaoSchema),
	});

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanGeracaoData());
		};
	}, []);

	useEffect(() => {
		if (open) {
			if (editFormData) {
				const formattedData = {
					...editFormData,
					mesReferencia: editFormData?.mesReferencia
						? parseISO(editFormData.mesReferencia)
						: undefined,
					dataCadastro: editFormData?.dataCadastro
						? parseISO(editFormData.dataCadastro)
						: undefined,
				};
				form.reset(formattedData as unknown as ZodGeracaoFormData);
			} else {
				form.reset(defaultValues);
			}
		}
	}, [open, editFormData, form]);

	useEffect(() => {
		if (!open) {
			dispatch(cleanGeracaoData());
		}
	}, [open]);

	const { mutate } = useMutation({
		mutationFn: async (formData: ZodGeracaoFormData) => {
			const formattedData = {
				...formData,
			};
			return await upsertGeracao(formattedData);
		},
		onSuccess: () => {
			toast.success("Geração criada com sucesso!");
			dispatch(toggleOpenGeracaoSheet(false));
		},
		onError: (e) => {
			toast.error("Erro ao criar Geração!", {
				description: e.message,
			});
		},
	});

	const sections = [{ id: "basic-info", label: "1. Informações Básicas" }];

	const handleSubmit = (data: ZodGeracaoFormData) => {
		mutate(data);
	};

	return (
		<FormSheet.Wrapper
			open={open}
			onOpenChange={(open) => dispatch(toggleOpenGeracaoSheet(open))}
		>
			<FormSheet.Aside sections={sections} title="Nova Geração" />
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				onCancel={() => dispatch(toggleOpenGeracaoSheet())}
				sections={sections}
			>
				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						1. Informações Básicas
					</h3>

					<div className="flex items-start justify-between gap-2">
						<FormField
							control={form.control}
							name="mesReferencia"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Mês de referência</FormLabel>
									<FormControl>
										<MonthPicker
											fromYear={new Date().getFullYear() - 20}
											toYear={new Date().getFullYear() + 10}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dataCadastro"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Data de cadastro</FormLabel>
									<FormControl>
										<Datepicker
											placeholder="Selecione a data de vencimento"
											placeholderFormat="dd/MM/yyyy"
											calendarProps={{
												fromYear: new Date().getFullYear(),
												toYear: new Date().getFullYear() + 50,
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
					<div className="flex items-start justify-between gap-2">
						<FormField
							control={form.control}
							name="valorConsumoInformado"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="line-clamp-1">
										Consumo informado (kWh)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											step={0.01}
											placeholder="Consumo informado (kWh)"
											type="number"
											value={field.value ?? undefined}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="valorGeracaoInformado"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="line-clamp-1">
										Geração informada (kWh)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											step={0.01}
											placeholder="Geração informada (kWh)"
											type="number"
											value={field.value ?? undefined}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex items-start justify-between gap-2">
						<FormField
							control={form.control}
							name="valorCreditoDistribuido"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="line-clamp-1">
										Créditos distribuidos (kWh)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											step={0.01}
											type="number"
											placeholder="Créditos distribuidos (kWh)"
											value={field.value ?? undefined}
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
									<FormLabel className="line-clamp-1">
										Energia compensada (kWh)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											step={0.01}
											placeholder="Energia compensada (kWh)"
											type="number"
											value={field.value ?? undefined}
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
