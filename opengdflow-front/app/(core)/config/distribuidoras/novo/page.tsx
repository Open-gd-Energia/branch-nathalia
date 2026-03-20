"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanDistribuitorsData,
	toggleOpenDistribuitorsSheet,
} from "@/lib/redux/features/distribuitors/slice";
import { UpsertDistribuitorsSheet } from "../_components/upsert-distribuitors";

export default function NewDistribuitorsPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenDistribuitorsSheet(true));
		// clean data on unmount
		return () => {
			dispatch(cleanDistribuitorsData());
			dispatch(toggleOpenDistribuitorsSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return (
		<UpsertDistribuitorsSheet onSuccess={handleClose} onClose={handleClose} />
	);
}
