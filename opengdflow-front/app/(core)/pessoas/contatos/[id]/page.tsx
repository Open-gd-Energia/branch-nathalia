"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanContactData,
	setContactData,
	toggleOpenContactSheet,
} from "@/lib/redux/features/contact/slice";
import { fetchDocuments } from "@/lib/services/documents/fetch";
import { UpsertContactSheet } from "../_components/upsert-contact";
import { fetchContactById } from "../_services/fetch-by-id";

export default function EditContactPage() {
	const { id } = useParams();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleOnEdit = async (id: string | number) => {
		try {
			// 1. fetch by id
			const contact = await fetchContactById(id);
			if (!contact) {
				toast.error("Contato não encontrado!");
				return;
			}
			// 2. find contact documents
			const documents = await fetchDocuments({
				queryParams: { idRepresentante: String(contact.id) },
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(contact as any).documentos = documents;

			// 3. dispatch data to redux
			dispatch(setContactData(contact));
			// 4. open form
			dispatch(toggleOpenContactSheet(true));
		} catch (error) {
			toast.error("Erro ao editar tipo de contato!");
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
			dispatch(cleanContactData());
			dispatch(toggleOpenContactSheet(false));
		};
	}, []);

	const handleClose = () => {
		router.back();
	};

	return <UpsertContactSheet onSuccess={handleClose} onClose={handleClose} />;
}
