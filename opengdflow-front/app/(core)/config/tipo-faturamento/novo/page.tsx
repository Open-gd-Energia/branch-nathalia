"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanBillingTypeData,
	toggleOpenBillingTypeSheet,
} from "@/lib/redux/features/billing-type/slice";
import { UpsertBillingTypeSheet } from "../_components/upsert-billing-type";

export default function NewBillingTypePage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenBillingTypeSheet(true));
		// clean data on unmount
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
