import { Paperclip } from "lucide-react";
import {
	type ChangeEvent,
	cloneElement,
	type FC,
	type InputHTMLAttributes,
	type MouseEvent,
	type ReactElement,
	useCallback,
} from "react";
import { Button } from "./ui/button";

export interface ProcessedFile extends File {
	base64: string;
}

// Now, instead of PropsWithChildren, we use ReactElement with props having optional onClick
export interface FileUploadButtonProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
	onUpload: (files: ProcessedFile[]) => void | Promise<unknown>;
	children?: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({
	children,
	onUpload,
	...inputProps
}) => {
	const readFileAsBase64 = useCallback((file: File) => {
		return new Promise<ProcessedFile>((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				const base64 = reader.result as string;
				const base64Parts = base64.split(",");
				const base64Data = base64Parts.length > 1 ? base64Parts[1] : base64;
				(file as ProcessedFile).base64 = base64Data;
				resolve(file as ProcessedFile);
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}, []);

	const handleFileUpload = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (!files) return;

			const processedFiles = await Promise.all(
				Array.from(files).map((file) => readFileAsBase64(file)),
			);

			await onUpload(processedFiles);

			e.target.value = "";
		},
		[onUpload],
	);

	const openFileDialog = () => {
		document.getElementById("file-input")?.click();
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
				{...inputProps}
			/>
			{children ? (
				cloneElement(children, {
					onClick: (e: MouseEvent) => {
						children.props.onClick?.(e);
						openFileDialog();
					},
				})
			) : (
				<Button
					onClick={openFileDialog}
					type="button"
					variant="outline"
					className="h-7 text-xs"
				>
					<Paperclip size={16} /> Anexar documento
				</Button>
			)}
		</>
	);
};
