"use client";

import type { FC } from "react";
import { useAppSelector } from "@/hooks/redux";
import type { Invoice } from "@/lib/models/invoices";
import { GridView } from "./grid-view";
import { ListView } from "./list-view";

export interface InvoicesListProps {
	data: Invoice[];
}

export const InvoicesList: FC<InvoicesListProps> = ({ data: invoicesList }) => {
	const visualization = useAppSelector((state) => state.invoices.visualization);

	return visualization === "list" ? (
		<ListView data={invoicesList} />
	) : (
		<GridView data={invoicesList} />
	);
};
