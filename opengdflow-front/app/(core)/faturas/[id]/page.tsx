"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanInvoiceData,
	setInvoiceData,
	toggleOpenInvoiceSheet,
} from "@/lib/redux/features/invoices/slice";
import { UpsertInvoiceSheet } from "../_components/upsert-invoice";
import { fetchInvoiceById } from "../_services/fetch-by-id";

export default function EditInvoicePage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const invoice = await fetchInvoiceById(id);
			if (!invoice) {
				toast.error("Fatura não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setInvoiceData(invoice));
			// 3. open form
			dispatch(toggleOpenInvoiceSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de fatura!");
			console.error("[handleOnEdit]:", error);
			router.back();
		}
	};

	useEffect(() => {
		if (id) {
			handleOnEdit(id as string);
		} else {
			router.back();
		}

		return () => {
			dispatch(cleanInvoiceData());
			dispatch(toggleOpenInvoiceSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return <UpsertInvoiceSheet onSuccess={handleClose} onClose={handleClose} />;
}
