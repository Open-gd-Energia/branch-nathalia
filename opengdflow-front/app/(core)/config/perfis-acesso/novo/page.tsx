"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanAccessProfilesData,
	toggleOpenAccessProfilesSheet,
} from "@/lib/redux/features/access-profiles/slice";
import { UpsertAccessProfilesSheet } from "../_components/upsert-access-profiles-sheet";

export default function NewAccessProfilePage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenAccessProfilesSheet(true));
		// clean data on unmount
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
