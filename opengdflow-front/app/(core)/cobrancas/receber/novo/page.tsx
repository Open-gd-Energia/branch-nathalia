"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanCobrancaPagarData,
	toggleOpenCobrancasPagarSheet,
} from "@/lib/redux/features/cobrancas/slice";
import { UpsertCobrancaSheet } from "../../_components/upsert-cobranca";

export default function NewReceberPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenCobrancasPagarSheet(true));
		// clean data on unmount
		return () => {
			dispatch(cleanCobrancaPagarData());
			dispatch(toggleOpenCobrancasPagarSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return <UpsertCobrancaSheet onSuccess={handleClose} onClose={handleClose} />;
}
