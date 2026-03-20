"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanAlocacaoData,
	setAlocacaoData,
	toggleOpenAlocacaoSheet,
} from "@/lib/redux/features/alocacao/slice";
import { UpsertAlocacaoSheet } from "../_components/upsert-alocacao";
import { fetchAlocacaoById } from "../_services/fetch-by-id";

export default function EditAlocacaoPage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const alocacao = await fetchAlocacaoById(id);
			if (!alocacao) {
				toast.error("Alocação não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setAlocacaoData(alocacao));
			// 3. open form
			dispatch(toggleOpenAlocacaoSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de alocação!");
			console.error("[handleOnEdit]:", error);
			router.back();
		}
	};

	useEffect(() => {
		if (id) {
			handleOnEdit(id as string);
		} else {
			router.back();
		}

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
