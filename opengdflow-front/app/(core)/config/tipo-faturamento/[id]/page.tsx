"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanBillingTypeData,
	setBillingTypeData,
	toggleOpenBillingTypeSheet,
} from "@/lib/redux/features/billing-type/slice";
import { UpsertBillingTypeSheet } from "../_components/upsert-billing-type";
import { fetchById } from "../_services/fetch-by-id";

export default function EditBillingTypePage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch billing type by id
			const billingType = await fetchById(id.toString());
			if (!billingType) {
				toast.error("Tipo de faturamento não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setBillingTypeData(billingType));
			// 3. open form
			dispatch(toggleOpenBillingTypeSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de faturamento!");
			console.error("[handleOnEdit]:", error);
		}
	};

	useEffect(() => {
		if (id) {
			handleOnEdit(id as string);
		} else {
			router.back();
		}

		return () => {
			dispatch(cleanBillingTypeData());
			dispatch(toggleOpenBillingTypeSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return (
		<UpsertBillingTypeSheet onSuccess={handleClose} onClose={handleClose} />
	);
}
