"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setItemsPerPage } from "@/lib/redux/features/list-table/slice";

export const ItemsPerPageSelect = () => {
	const dispatch = useAppDispatch();
	const itemsPerPage = useAppSelector(
		(state) => state.listTable.pagination.itemsPerPage,
	);

	const itemsPerPageOptions = [5, 10, 25, 50, 100, 200, 500];

	return (
		<Select
			defaultValue={itemsPerPage.toString()}
			onValueChange={(value) => dispatch(setItemsPerPage(Number(value)))}
		>
			<SelectTrigger size="sm">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{itemsPerPageOptions.map((option) => (
					<SelectItem key={option} value={option.toString()}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
