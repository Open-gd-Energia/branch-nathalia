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
import { alocacaoStatusOptions } from "@/lib/models/alocacao";
import type { Usina } from "@/lib/models/usina";
import {
	cleanAlocacaoData,
	toggleOpenAlocacaoSheet,
} from "@/lib/redux/features/alocacao/slice";
import { FormSheet } from "../../_components/form-sheet";
import { UsinaSelect } from "../../_components/usina-select";
import { upsertAlocacao } from "../_services/upsert";
import { ConsumidoresVinculados } from "./form-components/consumidores-vinculados";
import { InfoCards } from "./form-components/info-cards";
import {
	type ZodAlocacaoFormData,
	zodAlocacaoSchema,
} from "./form-components/zod-schemas";

export interface UpsertAlocacaoSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertAlocacaoSheet: FC<UpsertAlocacaoSheetProps> = ({
	onClose,
	onSuccess,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.alocacao.sheet.open);
	const editFormData = useAppSelector((state) => state.alocacao.sheet.data);

	// Initialize the form with the correct schema based on mode
	const form = useForm<ZodAlocacaoFormData>({
		resolver: zodResolver(zodAlocacaoSchema),
	});

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset({});
			dispatch(cleanAlocacaoData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			const transformedData = {
				...editFormData,
				dataInicio: editFormData.dataInicio
					? parseISO(editFormData.dataInicio)
					: undefined,
				dataFinal: editFormData.dataFinal
					? parseISO(editFormData.dataFinal)
					: undefined,
			};
			form.reset(transformedData as unknown as ZodAlocacaoFormData);
		}
	}, [editFormData]);

	useEffect(() => {
		if (!open) {
			form.reset({});
			dispatch(cleanAlocacaoData());
		}
	}, [open]);

	const { mutate } = useMutation({
		mutationFn: async (formData: ZodAlocacaoFormData) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			return await upsertAlocacao(formData as any);
		},
		onSuccess: () => {
			toast.success("Alocação criada com sucesso!");
			dispatch(toggleOpenAlocacaoSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar alocação!", {
				description: e.message,
			});
		},
	});

	const sections = [
		{ id: "basic-info", label: "1. Informações Básicas" },
		{ id: "consumidores-vinculados", label: "2. Consumidores Vinculados" },
	];

	const handleSubmit = (data: ZodAlocacaoFormData) => {
		mutate(data);
	};

	const handleClose = () => {
		dispatch(toggleOpenAlocacaoSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenAlocacaoSheet(open));
		if (!open) {
			onClose?.();
		}
	};

	return (
		<FormSheet.Wrapper open={open} onOpenChange={handleOpenChange}>
			<FormSheet.Aside
				sections={sections}
				title={editFormData?.id ? "Editar Alocação" : "Nova Alocação"}
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
					<div className="flex items-start justify-between gap-2">
						<FormField
							control={form.control}
							name="usina"
							render={({ field }) => (
								<FormItem className="w-3/4">
									<FormLabel>Usina</FormLabel>
									<FormControl>
										<UsinaSelect
											{...field}
											value={field.value as Usina}
											onValueChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem className="w-1/4">
							<FormLabel className="line-clamp-1">
								Unidade consumidora (UC)
							</FormLabel>
							<Input disabled value={form.watch("usina")?.uc ?? ""} />
							<FormMessage />
						</FormItem>
					</div>

					<div className="flex items-start justify-between gap-2">
						<FormField
							control={form.control}
							name="dataInicio"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Data início</FormLabel>
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

						<FormField
							control={form.control}
							name="dataFinal"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Data fim</FormLabel>
									<FormControl>
										<Datepicker
											calendarProps={{
												fromYear: new Date().getFullYear() - 10,
												toYear: new Date().getFullYear() + 50,
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

					<div className="flex items-start justify-between gap-2">
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
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(alocacaoStatusOptions).map(
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

						<div className="w-full" />
					</div>

					<InfoCards />
				</section>

				<Separator className="my-3" />

				<section id="consumidores-vinculados" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						2. Consumidores Vinculados
					</h3>

					<ConsumidoresVinculados />
				</section>
			</FormSheet.Form>
		</FormSheet.Wrapper>
	);
};
