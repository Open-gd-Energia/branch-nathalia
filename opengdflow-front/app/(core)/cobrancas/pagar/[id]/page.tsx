"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanCobrancaPagarData,
	setCobrancaPagarData,
	toggleOpenCobrancasPagarSheet,
} from "@/lib/redux/features/cobrancas/slice";
import { UpsertCobrancaSheet } from "../../_components/upsert-cobranca";
import { fetchCobrancaById } from "../../_services/fetch-by-id";

export default function EditCobrancaPagarPage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const cobranca = await fetchCobrancaById(id);
			if (!cobranca) {
				toast.error("Cobrança não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setCobrancaPagarData(cobranca));
			// 3. open form
			dispatch(toggleOpenCobrancasPagarSheet(true));
		} catch (error) {
			toast.error("Erro ao editar cobrança!");
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
			dispatch(cleanCobrancaPagarData());
			dispatch(toggleOpenCobrancasPagarSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return <UpsertCobrancaSheet onSuccess={handleClose} onClose={handleClose} />;
}
