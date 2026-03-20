"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanDiscountTypesData,
	toggleOpenDiscountTypesSheet,
} from "@/lib/redux/features/discount-types/slice";
import { UpsertDiscountTypeSheet } from "../_components/upsert-discount-types";

export default function NewDiscountTypePage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenDiscountTypesSheet(true));
		// clean data on unmount
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
