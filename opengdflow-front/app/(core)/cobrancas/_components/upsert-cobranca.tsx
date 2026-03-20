"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { ArrowRight, Save } from "lucide-react";
import { usePathname } from "next/navigation";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSheet } from "@/app/(core)/_components/form-sheet";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	cleanCobrancaPagarData,
	toggleOpenCobrancasPagarSheet,
} from "@/lib/redux/features/cobrancas/slice";
import { upsertCobranca } from "../_services/upsert";
import { FaturaViewSheet } from "./fatura-view/sheet";
import { CobrancaPagarForm } from "./form-components/cobranca-pagar-form";
import { CobrancaReceberForm } from "./form-components/cobranca-receber-form";
import {
	type ZodCobrancaFormData,
	zodCobrancaSchema,
} from "./form-components/zod-schemas";

const pagarSections = [
	{ id: "basic-info", label: "1. Informações Básicas" },
	{ id: "itens-eventuais", label: "2. Itens Eventuais" },
	{ id: "dados-calculo", label: "3. Dados de Cálculo" },
	{ id: "observacoes", label: "4. Observações" },
];

const receberSections = [
	{ id: "basic-info", label: "1. Informações Básicas" },
	{ id: "cobrancas-vinculadas", label: "2. Regras de Cobrança Vinculadas" },
	{ id: "itens-eventuais", label: "3. Itens Eventuais" },
	{ id: "dados-calculo", label: "4. Dados de Cálculo" },
	{ id: "observacoes", label: "5. Observações" },
];

export interface UpsertSheetProps {
	onSuccess?: () => void;
	onClose?: () => void;
}

export const UpsertCobrancaSheet: FC<UpsertSheetProps> = ({
	onSuccess,
	onClose,
}) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.cobrancas.sheet.open);
	const editFormData = useAppSelector((state) => state.cobrancas.sheet.data);

	const defaultValues: Partial<ZodCobrancaFormData> = {
		tipo: pathname.includes("receber") ? "RECEBER" : "PAGAR",
	};

	// Initialize the form with the correct schema based on mode
	const form = useForm<ZodCobrancaFormData>({
		defaultValues,
		resolver: zodResolver(zodCobrancaSchema),
	});

	const formType = form.watch("tipo");

	const sections = formType === "PAGAR" ? pagarSections : receberSections;

	useEffect(() => {
		// clean data on unmount
		return () => {
			form.reset(defaultValues);
			dispatch(cleanCobrancaPagarData());
		};
	}, []);

	useEffect(() => {
		if (editFormData) {
			const formattedData = {
				...editFormData,
				mesReferencia: editFormData?.mesReferencia
					? parseISO(editFormData?.mesReferencia)
					: undefined,
				dataVencimento: editFormData?.dataVencimento
					? parseISO(editFormData?.dataVencimento)
					: undefined,
				dataEmissao: editFormData?.dataEmissao
					? parseISO(editFormData?.dataEmissao)
					: undefined,
			};
			form.reset(formattedData as unknown as ZodCobrancaFormData);
		}
	}, [editFormData]);

	useEffect(() => {
		if (!open) {
			form.reset(defaultValues);
			dispatch(cleanCobrancaPagarData());
		} else if (!editFormData) {
			form.reset(defaultValues);
		}
	}, [open]);

	const { mutate } = useMutation({
		mutationFn: async (formData: ZodCobrancaFormData) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			return await upsertCobranca(formData as any);
		},
		onSuccess: () => {
			toast.success("Cobrança criado com sucesso!");
			dispatch(toggleOpenCobrancasPagarSheet(false));
			onSuccess?.();
		},
		onError: (e) => {
			toast.error("Erro ao criar Cobrança!", {
				description: e.message,
			});
		},
	});

	const handleClose = () => {
		dispatch(toggleOpenCobrancasPagarSheet(false));
		onClose?.();
	};

	const handleOpenChange = (open: boolean) => {
		dispatch(toggleOpenCobrancasPagarSheet(open));
		if (!open) {
			onClose?.();
		}
	};

	const handleSubmit = (data: ZodCobrancaFormData) => {
		mutate(data);
	};

	return (
		<FormSheet.Wrapper open={open} onOpenChange={handleOpenChange}>
			<FormSheet.Aside
				sections={sections}
				title={editFormData?.id ? "Editar Cobrança" : "Nova Cobrança"}
			/>
			<FormSheet.Form
				form={form}
				onSubmit={form.handleSubmit(handleSubmit)}
				customFooter={<FormFooter onCancel={handleClose} />}
				sections={sections}
			>
				{formType === "PAGAR" ? <CobrancaPagarForm /> : <CobrancaReceberForm />}
			</FormSheet.Form>
		</FormSheet.Wrapper>
	);
};

export interface FormFooterProps {
	onCancel?: () => void;
	onContinue?: () => void;
}

const FormFooter: FC<FormFooterProps> = ({ onCancel, onContinue }) => {
	return (
		<>
			<Button type="button" size="sm" variant="outline" onClick={onCancel}>
				Cancelar
			</Button>
			<div className="flex gap-2 items-center">
				<Button variant="secondary" type="submit" size="sm">
					<Save /> Salvar
				</Button>

				<FaturaViewSheet>
					<Button type="button" size="sm" onClick={onContinue}>
						Prosseguir <ArrowRight />
					</Button>
				</FaturaViewSheet>
			</div>
		</>
	);
};
