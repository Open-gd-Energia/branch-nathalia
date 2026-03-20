"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSheet } from "@/app/(core)/_components/form-sheet";
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
	cleanPrevisaoData,
	toggleOpenPrevisaoSheet,
} from "@/lib/redux/features/previsao/slice";
import { upsertPrevisao } from "../_services/upsert";
import { type ZodPrevisaoFormData, zodPrevisaoSchema } from "./zod-schema";

export interface UpsertPrevisaoSheetProps {
	usina: Usina;
}

export const UpsertPrevisaoSheet: FC<UpsertPrevisaoSheetProps> = ({
	usina,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.previsao.sheet.open);
	const editFormData = useAppSelector((state) => state.previsao.sheet.data);
	const defaultValues: Partial<ZodPrevisaoFormData> = {
		usina: {
			id: usina.id as number,
		},
	};

	// Initialize the form with the correct schema based on mode
	const form = useForm<ZodPrevisaoFormData>({
		defaultValues,
		resolver: zodResolver(zodPrevisaoSchema),
	});

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanPrevisaoData());
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
				};

				form.reset(formattedData as unknown as ZodPrevisaoFormData);
			} else {
				form.reset(defaultValues);
			}
		}
	}, [editFormData, open]);

	useEffect(() => {
		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanPrevisaoData());
		}
	}, [open]);

	const { mutate } = useMutation({
		mutationFn: async (formData: ZodPrevisaoFormData) => {
			const formattedData = {
				...formData,
			};
			return await upsertPrevisao(formattedData);
		},
		onSuccess: () => {
			toast.success("Previsão criada com sucesso!");
			dispatch(toggleOpenPrevisaoSheet(false));
		},
		onError: (e) => {
			toast.error("Erro ao criar Previsão!", {
				description: e.message,
			});
		},
	});

	const sections = [{ id: "basic-info", label: "1. Informações Básicas" }];

	const handleSubmit = (data: ZodPrevisaoFormData) => {
		mutate(data);
	};

	return (
		<FormSheet.Wrapper
			open={open}
			onOpenChange={(open) => dispatch(toggleOpenPrevisaoSheet(open))}
		>
			<FormSheet.Aside sections={sections} title="Nova Previsão" />
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				onCancel={() => dispatch(toggleOpenPrevisaoSheet())}
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
					</div>
					<div className="flex items-start justify-between gap-2">
						<FormField
							control={form.control}
							name="geracaoPrevista"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="line-clamp-1">
										Geração prevista (kWh)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											step={0.01}
											placeholder="Geração prevista (kWh)"
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
							name="consumoPrevisto"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="line-clamp-1">
										Consumo previsto (kWh)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											step={0.01}
											placeholder="Consumo previsto (kWh)"
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
							name="geracaoMediaPrevista"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="line-clamp-1">
										Geração média prevista (kWh)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											step={0.01}
											placeholder="Geração média prevista (kWh)"
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
							name="consumoMedioPrevisto"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel className="line-clamp-1">
										Consumo médio previsto (kWh)
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											step={0.01}
											type="number"
											placeholder="Consumo médio previsto (kWh)"
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
