import type { FC, PropsWithChildren } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleOpenFaturaViewSheet } from "@/lib/redux/features/fatura-view/slice";

export const ViewFaturaSheet: FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.faturaViewSheet.open);

	const onOpenChange = (open: boolean) => {
		dispatch(toggleOpenFaturaViewSheet(open));
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-4xl sm:max-w-none">
				<SheetHeader>
					<SheetTitle>Fatura</SheetTitle>
				</SheetHeader>
				<div className="flex h-full">{children}</div>
			</SheetContent>
		</Sheet>
	);
};
