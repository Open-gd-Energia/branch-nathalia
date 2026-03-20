import { type ClassValue, clsx } from "clsx";
import isEmpty from "lodash.isempty";
import type { Session } from "next-auth";
import { twMerge } from "tailwind-merge";
import type { Endereco } from "./models/address";
import type { DocumentoArquivo } from "./models/documento";
import { protectedRoutesMap } from "./routes-mapping";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getPathBasedOnScope = (session: Session): string => {
	const scopeArray = session?.user?.scope;
	let routeBasedOnAccesses = "";

	// if the route doesn't exist on the protectedRoutesMap, try another
	for (const scope of scopeArray) {
		if (Object.keys(protectedRoutesMap).includes(scope as string))
			routeBasedOnAccesses =
				protectedRoutesMap[scope as keyof typeof protectedRoutesMap][0];
	}

	if (session?.user?.scope.includes("DADOS"))
		return `/perfil/${session?.user?.perfil?.tipo?.toLocaleLowerCase()}`;
	if (session?.user?.scope.includes("ADMIN")) return "/dashboard";

	// format the route removing the *
	const defaultPath = routeBasedOnAccesses.replace(/\*/g, "");
	return defaultPath;
};

export function formatEndereco(endereco: Endereco): string {
	// Show only coordinates if that's all we have
	if (endereco?.latitude && endereco?.longitude && !endereco?.endereco) {
		return `Latitude: ${endereco.latitude}, Longitude: ${endereco.longitude}`;
	}

	const ruaENumero = [endereco?.endereco, endereco?.numero]
		.filter(Boolean)
		.join(", ");
	const cidadeEUf = endereco?.cidade
		? [endereco?.cidade?.nome, endereco?.cidade?.uf].filter(Boolean).join(" - ")
		: "";
	const cepFormatado = endereco?.cep
		? endereco?.cep?.replace(/^(\d{5})(\d{3})$/, "$1-$2")
		: "";

	const cidadeECep = endereco?.cidade
		? [cidadeEUf, cepFormatado].filter(Boolean).join(", ")
		: "";

	return [ruaENumero, cidadeECep].filter(Boolean).join("\n");
}

/** Converte valor vindo do backend (number ou string) para number de forma segura. */
export function toNumeric(
	value: number | string | null | undefined,
): number {
	if (value === undefined || value === null) return 0;
	if (typeof value === "number") return Number.isFinite(value) ? value : 0;
	const n = Number.parseFloat(String(value).replace(",", "."));
	return Number.isFinite(n) ? n : 0;
}

export const localeNumberFormat = (
	number?: number | string | null,
	maximumFractionDigits = 2,
) => {
	if (number === undefined || number === null) return "-";
	const n = toNumeric(number);
	return n.toLocaleString("pt-BR", {
		style: "decimal",
		maximumFractionDigits,
		minimumFractionDigits: 0,
		useGrouping: true,
	});
};

/** Valores financeiros em BRL: 2 casas decimais. Aceita number ou string (backend pode enviar string para precisão). */
export const localeCurrencyFormat = (value?: number | string | null) => {
	if (value === undefined || value === null) return "-";
	const n = toNumeric(value);
	return Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(n);
};

/** Medições de energia/tarifas: até 4 casas decimais (alinhado ao backend precision 19, scale 4). */
export const localeEnergyFormat = (
	value?: number | string | null,
	decimals = 4,
) => {
	if (value === undefined || value === null) return "-";
	const n = toNumeric(value);
	return n.toLocaleString("pt-BR", {
		style: "decimal",
		minimumFractionDigits: 0,
		maximumFractionDigits: decimals,
		useGrouping: true,
	});
};

export const downloadDocument = (doc: DocumentoArquivo) => {
	if (!doc?.base64 || !doc?.nome) throw new Error("Documento nao encontrado");

	// Convert base64 to a Blob
	const byteCharacters = atob(doc.base64);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	const blob = new Blob([byteArray], { type: doc.tipo });

	// Create and click download link
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = doc.nome;
	document.body.appendChild(link);
	link.click();

	// Clean up
	document.body.removeChild(link);
	URL.revokeObjectURL(link.href);
};

export const previewDocument = (doc: DocumentoArquivo) => {
	if (!doc?.base64 || !doc?.tipo) {
		throw new Error("Dados do documento inválidos para visualização.");
	}

	// Convert base64 to a Blob
	const byteCharacters = atob(doc.base64);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	const blob = new Blob([byteArray], { type: doc.tipo });

	// Create a URL for the Blob
	const fileURL = URL.createObjectURL(blob);

	// Open the URL in a new tab
	window.open(fileURL, "_blank");

	// Optional: Revoke the object URL after a delay if memory is a concern,
	// but the browser usually handles this when the tab is closed.
	// setTimeout(() => URL.revokeObjectURL(fileURL), 100);
};

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export function areFiltersEmpty<T extends object>(filters: T): boolean {
	return Object.values(filters).every((value) => {
		if (value === null || value === undefined) return true;
		if (typeof value === "number") return false;
		if (Array.isArray(value)) return value.length === 0;
		if (typeof value === "string") return value === "";
		return isEmpty(value);
	});
}

export function formatCPF(cpf: string): string {
	const cleanedCPF = cpf.replace(/[^\d]/g, "");
	return cleanedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(cnpj: string): string {
	// 1. Updated to keep both letters and numbers
	const cleanedCNPJ = cnpj.replace(/[^a-zA-Z0-9]/g, "");

	// It's good practice to avoid formatting if the length is incorrect
	if (cleanedCNPJ.length !== 14) {
		return cnpj;
	}

	// 2. Updated to match any character, not just digits
	return cleanedCNPJ.replace(
		/(.{2})(.{3})(.{3})(.{4})(.{2})/,
		"$1.$2.$3/$4-$5",
	);
}
