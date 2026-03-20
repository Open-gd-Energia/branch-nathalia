import { Loader2 } from "lucide-react";
import { type FC, type PropsWithChildren, useState } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

export interface EnsureDeleteModalProps extends PropsWithChildren {
	onDelete: () => Promise<unknown>;
	loading?: boolean;
}

export const EnsureDeleteModal: FC<EnsureDeleteModalProps> = ({
	children,
	onDelete,
	loading,
}) => {
	const [open, setOpen] = useState(false);

	const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		await onDelete();
		setOpen(false);
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Voce tem certeza que deseja excluir?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita. Você realmente deseja excluir este
						item?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>
						Cancelar
					</AlertDialogCancel>
					<Button onClick={handleDelete} disabled={loading}>
						{loading && <Loader2 className="animate-spin" />}
						Continuar
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
