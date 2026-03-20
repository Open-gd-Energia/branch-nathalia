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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { Distribuitors } from "@/lib/models/distribuidora";
import {
	cleanDistribuitorsData,
	toggleOpenDistribuitorsSheet,
} from "@/lib/redux/features/distribuitors/slice";
import { FormSheet } from "../../../_components/form-sheet";
import { upsertDistribuitors } from "../_services/upsert";

yup.setLocale(ptForm);

const distribuitorSchema = yup.object().shape({
	nome: yup.string().required(),
	sigla: yup.string().required(),
	url: yup.string().default("").optional(),
	status: yup.number().default(0).required(),
	estado: yup.string().default("").optional(),
});
const defaultValues: Partial<Distribuitors> = {
	nome: "",
	sigla: "",
	status: 1,
	url: "",
};

type DistribuitorsForm = yup.InferType<typeof distribuitorSchema>;

export interface UpsertDistribuitorsSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertDistribuitorsSheet: FC<UpsertDistribuitorsSheetProps> = ({
	onSuccess,
	onClose,
}) => {
	const form = useForm<DistribuitorsForm>({
		defaultValues,
		resolver: yupResolver(distribuitorSchema),
	});
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.distribuitors.sheet.open);
	const editFormData = useAppSelector(
		(state) => state.distribuitors.sheet.data,
	);

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanDistribuitorsData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			form.reset(editFormData);
		}

		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanDistribuitorsData());
		}
	}, [editFormData, open]);

	const { mutate } = useMutation({
		mutationFn: async (data: DistribuitorsForm) => upsertDistribuitors(data),
		onSuccess: () => {
			toast.success("Distribuidora criado com sucesso!");
			dispatch(toggleOpenDistribuitorsSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar Distribuidora!", {
				description: e.message,
			});
			console.error("[createDistribuitors]:", e);
		},
	});

	const handleClose = () => {
		dispatch(toggleOpenDistribuitorsSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenDistribuitorsSheet(open));
		if (!open) {
			onClose?.();
		}
	};

	const sections = [{ id: "basic-info", label: "1. Informações Básicas" }];

	return (
		<FormSheet.Wrapper open={open} onOpenChange={handleOpenChange}>
			<FormSheet.Aside
				sections={sections}
				title={editFormData?.id ? "Editar Distribuidora" : "Nova Distribuidora"}
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
								<FormItem className="w-2/3">
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="sigla"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sigla</FormLabel>
									<FormControl>
										<Input placeholder="Sigla" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Link para o canal da distribuidora</FormLabel>
								<FormControl>
									<Input
										placeholder="Link para o canal da distribuidora"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem className="w-fit">
								<FormLabel>Status</FormLabel>
								<FormControl>
									<Tabs
										value={field.value.toString()}
										onValueChange={(value) => field.onChange(Number(value))}
									>
										<TabsList>
											<TabsTrigger value="1">Ativo</TabsTrigger>
											<TabsTrigger value="0">Inativo</TabsTrigger>
										</TabsList>
									</Tabs>
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
