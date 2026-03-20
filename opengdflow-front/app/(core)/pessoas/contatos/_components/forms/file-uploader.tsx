import {
	AlertCircle,
	Download,
	ExternalLink,
	Paperclip,
	Trash2,
} from "lucide-react";
import {
	createContext,
	type FC,
	type PropsWithChildren,
	useContext,
	useState,
} from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EnsureDeleteModal } from "@/components/ensure-delete-modal";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { DocumentoArquivo } from "@/lib/models/documento";
import { fetchDocumentById } from "@/lib/services/documents/fetch-by-id";
import { downloadDocument, previewDocument } from "@/lib/utils";
import type { DocumentsSchema } from "./zod-schemas";

const DocumentsContext = createContext<ReturnType<
	typeof useFieldArray<DocumentsSchema, "documentos", "fieldId">
> | null>(null);

const Context: FC<PropsWithChildren> = ({ children }) => {
	const { control } = useFormContext<DocumentsSchema>();
	const fieldArray = useFieldArray({
		control,
		name: "documentos",
		keyName: "fieldId",
	});

	return (
		<DocumentsContext.Provider value={fieldArray}>
			{children}
		</DocumentsContext.Provider>
	);
};

const Upload = () => {
	const fieldArray = useContext(DocumentsContext);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		Array.from(files).forEach((file) => {
			// convert file to base64
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64 = reader.result as string;
				const base64Parts = base64.split(",");
				// remove the data URL prefix
				const base64Data = base64Parts.length > 1 ? base64Parts[1] : base64;
				// adiciona o arquivo ao array de documentos
				fieldArray?.append({
					base64: base64Data,
					tamanho: file.size,
					tipo: file.type,
					nome: file.name,
				});
			};
		});

		// limpa o input para permitir re-envio do mesmo arquivo se quiser
		e.target.value = "";
	};

	return (
		<>
			<input
				id="file-input"
				type="file"
				accept=".pdf,image/*"
				multiple
				onChange={handleFileUpload}
				style={{ display: "none" }}
			/>
			<Button
				onClick={() => document.getElementById("file-input")?.click()}
				type="button"
				variant="outline"
				className="h-7 text-xs"
			>
				<Paperclip size={16} /> Anexar documento
			</Button>
		</>
	);
};

export type FileUploaderListProps = {
	onDelete?: (id: number) => Promise<unknown>;
};

const List: FC<FileUploaderListProps> = ({ onDelete }) => {
	const [deleteLoading, setLoading] = useState(false);
	const fieldArray = useContext(DocumentsContext);
	const { formState } = useFormContext<DocumentsSchema>();

	const handleRemove = async (index: number, id?: number) => {
		setLoading(true);
		try {
			if (id) await onDelete?.(id);
			fieldArray?.remove(index);
		} finally {
			setLoading(false);
		}
	};

	const handleDownloadFile = async (id: number, field?: DocumentoArquivo) => {
		try {
			let docToDownload = field as DocumentoArquivo;

			if (id && !field?.base64) {
				const fetchedDoc = await fetchDocumentById(id);
				if (!fetchedDoc) throw new Error("Documento não encontrado");
				docToDownload = fetchedDoc;
			}
			downloadDocument(docToDownload);
		} catch (error) {
			console.error("[handleClick]:", id, error);
		}
	};

	const handlePreviewFile = async (
		id?: number,
		field?: DocumentsSchema["documentos"][number],
	) => {
		try {
			let docToPreview = field as DocumentoArquivo;

			// If the document is already saved (has an ID), fetch it
			if (id && !field?.base64) {
				// Only fetch if we don't have the base64
				const fetchedDoc = await fetchDocumentById(id);
				if (!fetchedDoc) throw new Error("Documento não encontrado");
				docToPreview = fetchedDoc;
			}

			if (docToPreview?.base64 && docToPreview.nome && docToPreview.tipo) {
				previewDocument(docToPreview);
			} else {
				throw new Error("Dados do arquivo incompletos para visualização.");
			}
		} catch (error) {
			console.error("[handlePreviewFile]:", error);
		}
	};

	return (
		<section className="flex flex-col gap-2 w-full">
			{formState.errors?.documentos?.message && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>
						{formState.errors?.documentos?.message?.toString()}
					</AlertTitle>
				</Alert>
			)}
			<Table wrapperClassName="border rounded-lg">
				<TableHeader>
					<TableRow>
						<TableHead className="max-w-80">Nome do arquivo</TableHead>
						<TableHead>Tamanho</TableHead>
						<TableHead />
						<TableHead />
						<TableHead />
					</TableRow>
				</TableHeader>
				<TableBody>
					{fieldArray?.fields.map((field, index) => (
						<TableRow key={field.fieldId}>
							<TableCell className="max-w-72">
								<span className="max-w-full truncate line-clamp-1 block">
									{field?.nome}
								</span>
							</TableCell>
							<TableCell>{
								// Formata o tamanho do arquivo em KB
								`${(field?.tamanho / 1024).toFixed(2)} KB`
							}</TableCell>
							<TableCell className="w-10 p-0 text-center">
								<Button
									onClick={() => handlePreviewFile(field.id, field)} // Pass the whole field for new files
									type="button"
									size="icon"
									variant="ghost"
									aria-label="Visualizar documento" // Updated aria-label
								>
									<ExternalLink size={16} /> {/* Updated Icon */}
								</Button>
							</TableCell>
							<TableCell className="w-10 p-0 text-center">
								<Button
									onClick={() => handleDownloadFile(field.id!)}
									type="button"
									size="icon"
									variant="ghost"
									aria-label="Bixar documento"
								>
									<Download size={16} />
								</Button>
							</TableCell>
							<TableCell className="w-10 p-0 text-center">
								<EnsureDeleteModal
									loading={deleteLoading}
									onDelete={() => handleRemove(index, field.id)}
								>
									<Button
										type="button"
										size="icon"
										variant="ghost"
										aria-label="Remover documento"
										className="text-destructive"
									>
										<Trash2 size={16} />
									</Button>
								</EnsureDeleteModal>
							</TableCell>
						</TableRow>
					))}
					{fieldArray?.fields?.length === 0 && (
						<TableRow>
							<TableCell
								colSpan={3}
								style={{ textAlign: "center", padding: 8 }}
							>
								Nenhum documento anexado
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</section>
	);
};

export const FileUploader = {
	Context,
	Upload,
	List,
};
