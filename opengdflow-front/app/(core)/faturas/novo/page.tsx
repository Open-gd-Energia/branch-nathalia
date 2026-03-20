"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanInvoiceData,
	toggleOpenInvoiceSheet,
} from "@/lib/redux/features/invoices/slice";
import { UpsertInvoiceSheet } from "../_components/upsert-invoice";

export default function NewInvoicePage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenInvoiceSheet(true));
		// clean data on unmount
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
