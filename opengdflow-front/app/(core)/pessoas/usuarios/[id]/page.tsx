"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanInternalUserData,
	setInternalUserData,
	toggleOpenInternalUserSheet,
} from "@/lib/redux/features/internal-user/slice";
import { UpsertInternalUserSheet } from "../_components/upsert-internal-user";
import { fetchInternalUserById } from "../_services/fetch-by-id";

export default function EditInternalUserPage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const internalUser = await fetchInternalUserById(id);
			if (!internalUser) {
				toast.error("Usuário não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setInternalUserData(internalUser));
			// 3. open form
			dispatch(toggleOpenInternalUserSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de usuário!");
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
