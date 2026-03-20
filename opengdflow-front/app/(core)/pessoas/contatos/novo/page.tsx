"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanContactData,
	toggleOpenContactSheet,
} from "@/lib/redux/features/contact/slice";
import { UpsertContactSheet } from "../_components/upsert-contact";

export default function NewContactPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenContactSheet(true));
		// clean data on unmount
		return () => {
			dispatch(cleanContactData());
			dispatch(toggleOpenContactSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return <UpsertContactSheet onSuccess={handleClose} onClose={handleClose} />;
}
