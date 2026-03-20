"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanDiscountTypesData,
	setDiscountTypesData,
	toggleOpenDiscountTypesSheet,
} from "@/lib/redux/features/discount-types/slice";
import { UpsertDiscountTypeSheet } from "../_components/upsert-discount-types";
import { fetchDiscountTypeById } from "../_services/fetch-by-id";

export default function EditDiscountTypePage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const discountType = await fetchDiscountTypeById(id);
			if (!discountType) {
				toast.error("tipo de desconto não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setDiscountTypesData(discountType));
			// 3. open form
			dispatch(toggleOpenDiscountTypesSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de tipo de desconto!");
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
			dispatch(cleanDiscountTypesData());
			dispatch(toggleOpenDiscountTypesSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return (
		<UpsertDiscountTypeSheet onSuccess={handleClose} onClose={handleClose} />
	);
}
