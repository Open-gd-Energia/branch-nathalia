"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
	AlertTriangle,
	BarChart,
	Calendar,
	CheckCircle,
	DollarSign,
	Download,
	Factory,
	Hash,
	History,
	Info,
	Loader,
	Percent,
	User,
} from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { Invoice } from "@/lib/models/invoices";
import {
	localeCurrencyFormat,
	localeEnergyFormat,
} from "@/lib/utils";

// Function to download PDF from base64 string
const downloadPdfFromBase64 = (base64String: string, fileName: string) => {
	try {
		const byteCharacters = atob(base64String);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: "application/pdf" });

		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(link.href);
	} catch (error) {
		console.error("Failed to download PDF:", error);
		// You could show a user-facing error here, e.g., using a toast notification
	}
};

export interface FaturaViewSheetProps extends PropsWithChildren {
	fatura: Invoice;
}

/** Medições de energia: até 4 casas decimais (alinhado ao backend). Aceita number ou string. */
const formatKWh = (value?: number | string | null) => {
	if (value === undefined || value === null) return "N/A";
	return `${localeEnergyFormat(value, 4)} kWh`;
};

export const FaturaSummaryViewSheet: FC<FaturaViewSheetProps> = ({
	children,
	fatura,
}) => {
	const handleDownload = () => {
		if (fatura.faturaPDF) {
			const fileName = `fatura-${fatura.numeroFatura || fatura.id}.pdf`;
			downloadPdfFromBase64(fatura.faturaPDF, fileName);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="w-4xl sm:max-w-none gap-0">
				<SheetHeader>
					<SheetTitle className="text-2xl font-bold">
						Detalhes da Fatura #{fatura.numeroFatura || fatura.id}
					</SheetTitle>
					<SheetDescription>
						Referente a:{" "}
						<span className="font-medium text-gray-700">
							{fatura.mesReferencia
								? format(parseISO(fatura.mesReferencia), "MMMM 'de' yyyy", {
										locale: ptBR,
									})
								: "N/A"}
						</span>
					</SheetDescription>
				</SheetHeader>
				<div className="space-y-6 p-4 pt-0 overflow-auto">
					{/* General Info */}
					<InfoCard title="Informações Gerais">
						<DataItem
							icon={Factory}
							label="Usina"
							value={fatura.usina?.nome || "N/A"}
						/>
						<DataItem
							icon={Hash}
							label="UC Usina"
							value={fatura.usina?.uc || "N/A"}
						/>
						<DataItem
							icon={User}
							label="Consumidor"
							value={fatura.consumidor?.nome || "N/A"}
						/>
						<DataItem
							icon={Hash}
							label="UC Consumidor"
							value={
								fatura.unidadeConsumidora || fatura.consumidor?.uc || "N/A"
							}
						/>
						<DataItem
							icon={Calendar}
							label="Vencimento"
							value={
								fatura.vencimento
									? format(parseISO(fatura.vencimento), "dd/MM/yyyy")
									: "N/A"
							}
						/>
						<DataItem
							icon={Calendar}
							label="Data da Leitura"
							value={
								fatura?.dataLeituraAtual
									? format(parseISO(fatura.dataLeituraAtual), "dd/MM/yyyy")
									: "N/A"
							}
						/>
						<DataItem
							icon={Calendar}
							label="Próxima Leitura"
							value={
								fatura.proximaLeitura
									? format(parseISO(fatura.proximaLeitura), "dd/MM/yyyy")
									: "N/A"
							}
						/>
						{fatura.faturaPDF && (
							<div className="col-span-full sm:col-span-1 flex items-end">
								<Button
									type="button"
									onClick={handleDownload}
									variant="outline"
								>
									<Download className="h-4 w-4" />
									<span>PDF da Fatura</span>
								</Button>
							</div>
						)}
					</InfoCard>

					{/* Values and Consumption */}
					<InfoCard title="Valores e Consumo">
						<DataItem
							icon={DollarSign}
							label="Valor Total da Fatura"
							value={localeCurrencyFormat(fatura.valorTotalFatura)}
							className="text-blue-600"
						/>
						<DataItem
							icon={BarChart}
							label="Consumo (kWh)"
							value={formatKWh(fatura.consumo)}
						/>
						<DataItem
							icon={BarChart}
							label="Energia Injetada (kWh)"
							value={formatKWh(fatura.energiaInjetada)}
						/>
						<DataItem
							icon={BarChart}
							label="Energia Compensada Local (kWh)"
							value={formatKWh(fatura.energiaConpensadaLocal)}
						/>
						<DataItem
							icon={BarChart}
							label="Energia Distribuída (kWh)"
							value={formatKWh(fatura.energiaDistribuida)}
						/>
						<DataItem
							icon={BarChart}
							label="Créditos Distribuídos"
							value={formatKWh(fatura.creditoDistribuidos)}
						/>
					</InfoCard>

					{/* Balance */}
					<InfoCard title="Saldos e Créditos (kWh)">
						<DataItem
							icon={History}
							label="Saldo Acumulado Anterior"
							value={formatKWh(fatura.saldoAcumuladoAnterior)}
						/>
						<DataItem
							icon={History}
							label="Saldo Acumulado Atual"
							value={formatKWh(fatura.saldoAcumuladoAtual)}
							className="text-green-600"
						/>
						<DataItem
							icon={History}
							label="Movimentação do Saldo"
							value={formatKWh(fatura.movimentacaoSaldo)}
						/>
						<DataItem
							icon={History}
							label="Saldo Faltante"
							value={formatKWh(fatura.saldoFaltante)}
							className="text-red-600"
						/>
					</InfoCard>

					{/* Tariff Data (R$/kWh: 4 casas decimais conforme backend) */}
					<InfoCard title="Dados Tarifários (R$/kWh)">
						<DataItem
							icon={Info}
							label="Tarifa TE (Compensável)"
							value={`R$ ${localeEnergyFormat(fatura.tarifaTECompensavel, 4)}`}
						/>
						<DataItem
							icon={Info}
							label="Tarifa TUSD (Compensável)"
							value={`R$ ${localeEnergyFormat(fatura.tarifaTUSDCompensavel, 4)}`}
						/>
						<DataItem
							icon={Info}
							label="Tarifa Total (Compensável)"
							value={`R$ ${localeEnergyFormat(fatura.tarifaTotalCompensavel, 4)}`}
						/>
						<DataItem
							icon={Info}
							label="Tarifa Total (SI)"
							value={`R$ ${localeEnergyFormat(fatura.tarifaTotalSI, 4)}`}
						/>
						<DataItem
							icon={Info}
							label="Tarifa Total (CI)"
							value={`R$ ${localeEnergyFormat(fatura.tarifaTotalCI, 4)}`}
						/>
					</InfoCard>

					{/* Taxes */}
					<InfoCard title="Impostos">
						<DataItem
							icon={Percent}
							label="ICMS (%)"
							value={fatura.icms ? `${fatura.icms}%` : "N/A"}
						/>
						<DataItem
							icon={DollarSign}
							label="Valor ICMS"
							value={localeCurrencyFormat(fatura.valorIcms)}
						/>
						<DataItem
							icon={Percent}
							label="PIS (%)"
							value={fatura.pis ? `${fatura.pis}%` : "N/A"}
						/>
						<DataItem
							icon={DollarSign}
							label="Valor PIS"
							value={localeCurrencyFormat(fatura.valorPis)}
						/>
						<DataItem
							icon={Percent}
							label="COFINS (%)"
							value={fatura.confins ? `${fatura.confins}%` : "N/A"}
						/>
						<DataItem
							icon={DollarSign}
							label="Valor COFINS"
							value={localeCurrencyFormat(fatura.valorConfins)}
						/>
					</InfoCard>

					{/* Billing History */}
					{fatura.historicoFaturamentos &&
						fatura.historicoFaturamentos.length > 0 && (
							<div className="bg-white p-6 rounded-lg border">
								<h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
									Histórico de Faturamento
								</h3>
								<div className="overflow-x-auto">
									<table className="w-full text-left text-sm">
										<thead className="bg-gray-50 text-gray-600">
											<tr>
												<th className="p-3 font-semibold">Data da Leitura</th>
												<th className="p-3 font-semibold">Dias</th>
												<th className="p-3 font-semibold">
													Energia Ativa (kWh)
												</th>
											</tr>
										</thead>
										<tbody className="divide-y">
											{fatura.historicoFaturamentos.map((hist, index) => (
												<tr key={index} className="hover:bg-gray-50">
													<td className="p-3">
														{hist.data ? format(hist.data, "dd/MM/yyyy") : "-"}
													</td>
													<td className="p-3">{hist.dias ?? "N/A"}</td>
													<td className="p-3">
														{formatKWh(hist.energiaAtiva)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}

					{/* Observation */}
					{fatura.observacao && (
						<div className="bg-white p-6 rounded-lg border">
							<h3 className="text-lg font-bold text-gray-900 mb-2">
								Observações
							</h3>
							<p className="text-gray-600 whitespace-pre-wrap">
								{fatura.observacao}
							</p>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

// A styled container for sections
const InfoCard = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div className="bg-white p-6 rounded-lg border">
		<h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
			{title}
		</h3>
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{children}
		</div>
	</div>
);

// A reusable component for displaying a piece of data
const DataItem = ({
	icon: Icon,
	label,
	value,
	className = "",
}: {
	icon: React.ElementType;
	label: string;
	value: React.ReactNode;
	className?: string;
}) => {
	if (value === undefined || value === null || value === "N/A") return null;

	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			<div className="flex items-center gap-2 text-sm text-gray-500">
				<Icon className="h-4 w-4" />
				<span>{label}</span>
			</div>
			<p className="text-base font-semibold text-gray-800">{value}</p>
		</div>
	);
};

const _StatusBadge = ({ status }: { status?: Invoice["status"] }) => {
	const statusConfig = {
		PROCESSADA: {
			label: "Processada",
			icon: CheckCircle,
			color: "text-green-700 bg-green-100",
		},
		EM_PROCESSAMENTO: {
			label: "Em Processamento",
			icon: Loader,
			color: "text-blue-700 bg-blue-100",
		},
		ERRO: {
			label: "Erro",
			icon: AlertTriangle,
			color: "text-red-700 bg-red-100",
		},
	};

	if (!status) return null;
	const config = statusConfig[status];

	return (
		<div
			className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full w-fit ${config.color}`}
		>
			<config.icon
				className={`h-4 w-4 ${status === "EM_PROCESSAMENTO" && "animate-spin"}`}
			/>
			<span>{config.label}</span>
		</div>
	);
};
