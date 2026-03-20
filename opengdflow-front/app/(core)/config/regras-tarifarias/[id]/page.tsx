"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanTariffRulesData,
	setTariffRulesData,
	toggleOpenTariffRulesSheet,
} from "@/lib/redux/features/tariff-rules/slice";
import { UpsertTariffRulesSheet } from "../_components/upsert-tariff-rules";
import { fetchTariffRulesById } from "../_services/fetch-by-id";

export default function EditTariffRulesPage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const tariffRules = await fetchTariffRulesById(id);
			if (!tariffRules) {
				toast.error("Regra tarifária não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setTariffRulesData(tariffRules));
			// 3. open form
			dispatch(toggleOpenTariffRulesSheet(true));
		} catch (error) {
			toast.error("Erro ao editar regra tarifária!");
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
			dispatch(cleanTariffRulesData());
			dispatch(toggleOpenTariffRulesSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return (
		<UpsertTariffRulesSheet onSuccess={handleClose} onClose={handleClose} />
	);
}
