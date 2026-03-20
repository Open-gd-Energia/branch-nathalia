"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanAlocacaoData,
	toggleOpenAlocacaoSheet,
} from "@/lib/redux/features/alocacao/slice";
import { UpsertAlocacaoSheet } from "../_components/upsert-alocacao";

export default function NewAlocacaoPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenAlocacaoSheet(true));
		// clean data on unmount
		return () => {
			dispatch(cleanAlocacaoData());
			dispatch(toggleOpenAlocacaoSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return <UpsertAlocacaoSheet onSuccess={handleClose} onClose={handleClose} />;
}
