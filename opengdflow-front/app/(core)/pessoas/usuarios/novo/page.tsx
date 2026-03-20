"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanInternalUserData,
	toggleOpenInternalUserSheet,
} from "@/lib/redux/features/internal-user/slice";
import { UpsertInternalUserSheet } from "../_components/upsert-internal-user";

export default function NewUsuarioPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenInternalUserSheet(true));
		// clean data on unmount
		return () => {
			dispatch(cleanInternalUserData());
			dispatch(toggleOpenInternalUserSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return (
		<UpsertInternalUserSheet onSuccess={handleClose} onClose={handleClose} />
	);
}
