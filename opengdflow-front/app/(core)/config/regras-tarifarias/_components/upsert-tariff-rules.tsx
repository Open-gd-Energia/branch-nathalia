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
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { TariffRules } from "@/lib/models/tariff-rules";
import {
	cleanTariffRulesData,
	toggleOpenTariffRulesSheet,
} from "@/lib/redux/features/tariff-rules/slice";
import { FormSheet } from "../../../_components/form-sheet";
import { upsertTariffRules } from "../_services/upsert";

yup.setLocale(ptForm);

const tariffRulesSchema = yup.object().shape({
	nome: yup.string().required(),
	valor: yup.number().required(),
	descricao: yup.string().default("").optional(),
});
const defaultValues: Partial<TariffRules> = {
	nome: "",
	valor: 0,
	descricao: "",
};

type TariffRulesForm = yup.InferType<typeof tariffRulesSchema>;

export interface UpsertTariffRulesSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertTariffRulesSheet: FC<UpsertTariffRulesSheetProps> = ({
	onSuccess,
	onClose,
}) => {
	const form = useForm<TariffRulesForm>({
		defaultValues,
		resolver: yupResolver(tariffRulesSchema),
	});
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.tariffRules.sheet.open);
	const editFormData = useAppSelector((state) => state.tariffRules.sheet.data);

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanTariffRulesData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			form.reset(editFormData);
		}

		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanTariffRulesData());
		}
	}, [editFormData, open]);

	const { mutate } = useMutation({
		mutationFn: async (data: TariffRulesForm) => upsertTariffRules(data),
		onSuccess: () => {
			toast.success("Regra tarifária criada com sucesso!");
			dispatch(toggleOpenTariffRulesSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar regra tarifária!", {
				description: e.message,
			});
			console.error("[createTariffRules]:", e);
		},
	});

	const handleClose = () => {
		dispatch(toggleOpenTariffRulesSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenTariffRulesSheet(open));
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
					editFormData?.id ? "Editar Regra Tarifária" : "Nova Regra Tarifária"
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
							name="valor"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Valor tarifário (R$/kWh)</FormLabel>
									<FormControl>
										<Input type="number" {...field} />
									</FormControl>
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
