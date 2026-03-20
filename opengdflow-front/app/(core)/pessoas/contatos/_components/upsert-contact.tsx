"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type FC, type PropsWithChildren, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormLabel } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { tipoPessoaOptions } from "@/lib/models/contact";
import {
	cleanContactData,
	toggleOpenContactSheet,
} from "@/lib/redux/features/contact/slice";
import { upsertDocument } from "@/lib/services/documents/upsert";
import { FormSheet } from "../../../_components/form-sheet";
import { type UpsertContact, upsertContact } from "../_services/upsert";
import { PFForm } from "./forms/pf-form";
import { PJForm } from "./forms/pj-form";
import { type ZodContactSchema, zodContactSchema } from "./forms/zod-schemas";

const defaultValues: Partial<ZodContactSchema> = {
	status: 1,
	tipoPessoa: "PESSOA_FISICA" as ZodContactSchema["tipoPessoa"],
	addressType: "address",
};

const pfSections = [
	{ id: "basic-info", label: "1. Informações Básicas" },
	{ id: "localization", label: "2. Localização" },
	{ id: "documents", label: "3. Documentos" },
];

const pJsections = [
	{ id: "basic-info", label: "1. Informações Básicas" },
	{ id: "localization", label: "2. Localização" },
	{ id: "documents", label: "4. Documentos" },
];

export interface UpsertContactSheetProps extends PropsWithChildren {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertContactSheet: FC<UpsertContactSheetProps> = ({
	onSuccess,
	onClose,
}) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.contact.sheet.open);
	const editFormData = useAppSelector((state) => state.contact.sheet.data);

	// Initialize the form with the correct schema based on mode
	const form = useForm<ZodContactSchema>({
		defaultValues,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		resolver: zodResolver(zodContactSchema as any),
	});

	const sections = useMemo(() => {
		return form.watch("tipoPessoa") === "PESSOA_FISICA"
			? pfSections
			: pJsections;
	}, [form.watch("tipoPessoa")]);

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanContactData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			const formData = {
				...editFormData,
				addressType:
					editFormData?.endereco?.latitude && editFormData?.endereco?.longitude
						? "coordinates"
						: "address",
				pessoaFisica: {
					...editFormData.pessoaFisica,
					dataNascimento: editFormData?.pessoaFisica?.dataNascimento
						? new Date(editFormData.pessoaFisica.dataNascimento)
						: undefined,
				},
			};
			form.reset(formData as ZodContactSchema);
		}

		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanContactData());
		}
	}, [open]);

	const { mutate, isPending } = useMutation({
		mutationFn: async (formData: ZodContactSchema) => {
			const contact = await upsertContact(formData as UpsertContact);

			const documents = formData?.documentos || [];
			for (const document of documents) {
				if (!document?.base64 || document?.id) continue;
				await upsertDocument({
					...document,
					representante: {
						id: contact.id,
					},
					base64: document.base64,
				});
			}

			return contact;
		},
		onSuccess: async () => {
			toast.success("Contato criado com sucesso!");
			dispatch(toggleOpenContactSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar contato!", {
				description: e.message,
			});
		},
	});

	const handleSubmit = (data: ZodContactSchema) => {
		mutate(data);
	};

	const handleChangePersonType = (value: string) => {
		form.reset();
		form.clearErrors();
		form.setValue("tipoPessoa", value as ZodContactSchema["tipoPessoa"]);
	};

	const handleClose = () => {
		dispatch(toggleOpenContactSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenContactSheet(open));
		if (!open) {
			onClose?.();
		}
	};

	return (
		<FormSheet.Wrapper open={open} onOpenChange={handleOpenChange}>
			<FormSheet.Aside
				sections={sections}
				title={editFormData?.id ? "Editar Contato" : "Novo Contato"}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				onCancel={handleClose}
				submitLoading={isPending}
				sections={sections}
			>
				<Tabs
					defaultValue="PESSOA_FISICA"
					value={form.watch("tipoPessoa")}
					onValueChange={handleChangePersonType}
				>
					<section>
						<h3 className="font-semibold leading-7 mb-5">
							1. Informações Básicas
						</h3>
						<FormLabel>Tipo de pessoa</FormLabel>
						<TabsList className="mb-2">
							{Object.entries(tipoPessoaOptions).map(([value, label]) => (
								<TabsTrigger key={value} value={value}>
									{label}
								</TabsTrigger>
							))}
						</TabsList>
					</section>
					<TabsContent value="PESSOA_FISICA">
						<PFForm />
					</TabsContent>
					<TabsContent value="PESSOA_JURIDICA">
						<PJForm />
					</TabsContent>
					<TabsContent value="GESTORA">
						<PJForm />
					</TabsContent>
				</Tabs>
			</FormSheet.Form>
		</FormSheet.Wrapper>
	);
};
