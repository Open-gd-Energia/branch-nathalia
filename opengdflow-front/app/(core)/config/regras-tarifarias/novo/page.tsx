"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
	cleanTariffRulesData,
	toggleOpenTariffRulesSheet,
} from "@/lib/redux/features/tariff-rules/slice";
import { UpsertTariffRulesSheet } from "../_components/upsert-tariff-rules";

export default function NewRegrasTarifariasPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(toggleOpenTariffRulesSheet(true));
		// clean data on unmount
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
