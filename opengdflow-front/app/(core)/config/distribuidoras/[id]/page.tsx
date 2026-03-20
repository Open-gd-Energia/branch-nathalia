"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanDistribuitorsData,
	setDistribuitorsData,
	toggleOpenDistribuitorsSheet,
} from "@/lib/redux/features/distribuitors/slice";
import { UpsertDistribuitorsSheet } from "../_components/upsert-distribuitors";
import { fetchDistribuitorsById } from "../_services/fetch-by-id";

export default function EditDistribuitorsPage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const distribuitors = await fetchDistribuitorsById(id);
			if (!distribuitors) {
				toast.error("Distribuidor não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setDistribuitorsData(distribuitors));
			// 3. open form
			dispatch(toggleOpenDistribuitorsSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de distribuidor!");
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
