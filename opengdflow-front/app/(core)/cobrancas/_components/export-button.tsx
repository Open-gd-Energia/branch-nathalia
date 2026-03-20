"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Upload } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import type { Cobranca } from "@/lib/models/cobranca";
import type { CobrancasFilters } from "@/lib/redux/features/cobrancas/slice";
import { fetchCobranca } from "../_services/fetch";

/**
 * Converts an array of objects to a CSV string.
 * @param data The array of data to convert.
 * @returns A string in CSV format.
 */
const convertToCSV = (data: Cobranca[]): string => {
	if (!data || data.length === 0) {
		return "";
	}

	const headers = [
		"ID",
		"Identificador",
		"Consumidor",
		"Usina",
		"Tipo",
		"Mês de Referência",
		"Data de Vencimento",
		"Data de Emissão",
		"Status",
		"Valor Total (R$)",
	];

	const rows = data.map((item) => {
		// Safely access nested properties and format data for CSV
		const consumerName = item.consumidor?.nome ?? "N/A";
		const usinaName = item.usina?.nome ?? "N/A";
		const mesReferencia = item.mesReferencia
			? format(new Date(item.mesReferencia), "MM/yyyy")
			: "";
		const dataVencimento = item.dataVencimento
			? format(new Date(item.dataVencimento), "dd/MM/yyyy")
			: "";
		const dataEmissao = item.dataEmissao
			? format(new Date(item.dataEmissao), "dd/MM/yyyy")
			: "";
		const valorTotal = item.valorTotal
			? item.valorTotal.toLocaleString("pt-BR", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})
			: "0,00";

		// Values must be in the same order as headers
		return [
			item.id,
			item.identificador,
			consumerName,
			usinaName,
			item.tipo,
			mesReferencia,
			dataVencimento,
			dataEmissao,
			item.status,
			valorTotal,
		]
			.map((value) => `"${value ?? ""}"`) // Handle null/undefined and wrap in quotes
			.join(",");
	});

	return [headers.join(","), ...rows].join("\n");
};

/**
 * Triggers a browser download for the given CSV content.
 * @param csvString The CSV content to download.
 * @param fileName The name of the file to be downloaded.
 */
const downloadCSV = (csvString: string, fileName: string) => {
	const blob = new Blob([`\uFEFF${csvString}`], {
		type: "text/csv;charset=utf-8;",
	});
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);

	link.setAttribute("href", url);
	link.setAttribute("download", fileName);
	link.style.visibility = "hidden";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	URL.revokeObjectURL(url);
};

export const ExportButton: FC<{ tipo: CobrancasFilters["tipo"] }> = ({
	tipo,
}) => {
	const filters = useAppSelector((state) => state.cobrancas.filters);
	const searchParams = useSearchParams();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: [
			"cobrancas-list",
			"PAGAR",
			filters,
			searchParams.get("search") ?? "",
		],
		queryFn: async () =>
			fetchCobranca({
				...filters,
				identificador: searchParams.get("search"),
				tipo: "PAGAR",
			}),
	});

	const handleExport = () => {
		const recordsToExport = data;

		if (recordsToExport && recordsToExport.length > 0) {
			const csvString = convertToCSV(recordsToExport);
			const fileName = `cobrancas_${
				tipo?.toLowerCase() ?? "export"
			}_${new Date().toISOString().slice(0, 10)}.csv`;
			downloadCSV(csvString, fileName);
		} else {
			console.warn("No data available to export.");
		}
	};

	const hasData = data && data.length > 0;

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleExport}
			disabled={isLoading || isFetching || !hasData}
		>
			<Upload className="mr-2 h-4 w-4" />
			Exportar
		</Button>
	);
};
