"use client";

import { FileIcon, Upload } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { ZodInvoiceFormData } from "./zod-schemas";

export const FileInput = () => {
	const [isDragging, setIsDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const form = useFormContext<ZodInvoiceFormData>();
	const currentFile = form.watch("faturaPDF");

	// Função para converter File para base64
	const fileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				if (typeof reader.result === "string") {
					// Remove o prefixo "data:application/pdf;base64," do resultado
					const base64String = reader.result.split(",")[1];
					resolve(base64String);
				} else {
					reject(new Error("Failed to convert file to base64"));
				}
			};
			reader.onerror = (error) => reject(error);
		});
	};

	// Função para processar os arquivos (tanto via input quanto via drop)
	const processFiles = async (files: FileList) => {
		const file = files[0];
		try {
			const base64String = await fileToBase64(file);
			form.setValue("faturaPDF", base64String);
		} catch (error) {
			console.error("Error converting file to base64:", error);
		}
	};

	// Handler do input[type="file"]
	const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files?.length) return;
		await processFiles(files);
	};

	// Handler do drop
	const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const files = e.dataTransfer.files;
		if (!files?.length) return;
		await processFiles(files);
	};

	return (
		<div
			onDragOver={(e) => e.preventDefault()}
			onDragEnter={(e) => {
				e.preventDefault();
				setIsDragging(true);
			}}
			onDragLeave={(e) => {
				e.preventDefault();
				setIsDragging(false);
			}}
			onDrop={handleDrop}
			className={cn(
				"h-14 w-full rounded-md border-2 border-dashed py-2 px-4 flex items-center justify-center cursor-pointer",
				isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
				currentFile ? "bg-blue-50 border-blue-200" : "bg-muted",
			)}
			// ao clicar na área (fora do input oculto), disparar o click do input
			onClick={() => inputRef.current?.click()}
		>
			<input
				ref={inputRef}
				id="file-input"
				type="file"
				accept=".pdf"
				onChange={handleFileUpload}
				style={{ display: "none" }}
			/>
			<div className="flex items-center gap-2">
				{currentFile ? (
					<FileIcon size={16} className="text-blue-500" />
				) : (
					<Upload size={16} />
				)}
				<span className="text-xs text-muted-foreground">
					{currentFile ? (
						<span className="text-blue-600">Arquivo PDF carregado</span>
					) : isDragging ? (
						"Solte os arquivos aqui para fazer upload"
					) : (
						"Clique ou arraste a fatura para cá"
					)}
				</span>
			</div>
		</div>
	);
};
