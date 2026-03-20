"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { type FC, type PropsWithChildren, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { ptForm } from "yup-locale-pt";
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
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { billingTypeReferenceOptions } from "@/lib/models/billing-type";
import {
	cleanBillingTypeData,
	toggleOpenBillingTypeSheet,
} from "@/lib/redux/features/billing-type/slice";
import { FormSheet } from "../../../_components/form-sheet";
import { upsertBillingType } from "../_services/upsert";

yup.setLocale(ptForm);

const billingTypeSchema = yup.object().shape({
	nome: yup.string().required(),
	referencia: yup
		.string()
		.required()
		.oneOf(Object.keys(billingTypeReferenceOptions)),
	descricao: yup.string().default("").optional(),
});
const defaultValues = {
	nome: "",
	referencia: "",
	descricao: "",
};

type BillingTypeForm = yup.InferType<typeof billingTypeSchema>;

export interface UpsertBillingTypeSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertBillingTypeSheet: FC<UpsertBillingTypeSheetProps> = ({
	onSuccess,
	onClose,
}) => {
	const form = useForm<BillingTypeForm>({
		defaultValues,
		resolver: yupResolver(billingTypeSchema),
	});
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.billingType.sheet.open);
	const editFormData = useAppSelector((state) => state.billingType.sheet.data);

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanBillingTypeData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			form.reset(editFormData);
		}

		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanBillingTypeData());
		}
	}, [editFormData, open]);

	const { mutate } = useMutation({
		mutationFn: async (data: BillingTypeForm) => upsertBillingType(data),
		onSuccess: () => {
			toast.success("Tipo de faturamento criado com sucesso!");
			dispatch(toggleOpenBillingTypeSheet(false));
			onSuccess?.();
		},
		onError: () => {
			toast.error("Erro ao criar Tipo de faturamento!");
		},
	});

	const handleClose = () => {
		dispatch(toggleOpenBillingTypeSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenBillingTypeSheet(open));
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
					editFormData?.id
						? "Editar tipo de faturamento"
						: "Novo tipo de faturamento"
				}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit((data) => mutate(data))}
				onCancel={handleClose}
				sections={sections}
			>
				<section id="basic-info" className="flex flex-col gap-4">
					<h3 className="font-semibold leading-7 mb-1">
						1. Informações Básicas
					</h3>
					<div className="flex gap-2 w-full items-start">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="referencia"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Referência de Faturamento (kWh)</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecione..." />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(billingTypeReferenceOptions).map(
												(ref) => (
													<SelectItem key={ref[0]} value={ref[0]}>
														{ref[1]}
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
