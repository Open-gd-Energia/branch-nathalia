"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanAccessProfilesData,
	setAccessProfilesData,
	toggleOpenAccessProfilesSheet,
} from "@/lib/redux/features/access-profiles/slice";
import { UpsertAccessProfilesSheet } from "../_components/upsert-access-profiles-sheet";
import { fetchAccessProfileById } from "../_services/fetch-by-id";

export default function EditAccessProfilesPage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const accessProfile = await fetchAccessProfileById(id);
			if (!accessProfile) {
				toast.error("Perfil de acesso não encontrado!");
				return;
			}
			// 2. dispatch data to redux
			dispatch(setAccessProfilesData(accessProfile));
			// 3. open form
			dispatch(toggleOpenAccessProfilesSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de perfil de acesso!");
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
			dispatch(cleanAccessProfilesData());
			dispatch(toggleOpenAccessProfilesSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return (
		<UpsertAccessProfilesSheet onSuccess={handleClose} onClose={handleClose} />
	);
}
