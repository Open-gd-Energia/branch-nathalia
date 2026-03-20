"use client";
import {
	ArrowDown,
	ArrowUp,
	ChevronLeft,
	ChevronRight,
	ChevronsUpDown,
	Pencil,
	Trash2,
} from "lucide-react";
import {
	type ComponentProps,
	type ReactNode,
	useEffect,
	useMemo,
	useState,
} from "react";
import { EnsureDeleteModal } from "@/components/ensure-delete-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	type TableProps,
	TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
	changePage,
	clearData,
	clearPagination,
	setData,
	setFilteredData,
	setTotalItems,
} from "@/lib/redux/features/list-table/slice";
import { cn } from "@/lib/utils";

export interface TableColumns<T> {
	key: string;
	label: string;
	cellProps?: ComponentProps<"td">;
	badge?: boolean;
	badgeProps?: ComponentProps<typeof Badge>;
	render: (row: T) => ReactNode;
}

export interface ListLayoutProps<T> extends TableProps {
	rows: T[] | null;
	tableColumns?: TableColumns<T>[];
	onDelete?: (id: string | number) => Promise<unknown>;
	onEdit?: (id: string | number) => Promise<unknown>;
	onRowClick?: (id: string | number) => Promise<unknown> | void;
	onRowClickRowInfo?: (row: T) => Promise<unknown> | void;
	footerWrapperProps?: ComponentProps<"footer">;
}

type SortConfig = {
	key: string;
	direction: "asc" | "desc";
} | null;

export function ListTable<T>({
	tableColumns,
	rows,
	onDelete,
	onEdit,
	onRowClick,
	onRowClickRowInfo,
	footerWrapperProps,
	...tableProps
}: ListLayoutProps<T>) {
	const dispatch = useAppDispatch();
	const { currentPage, itemsPerPage, totalItems } = useAppSelector(
		(state) => state.listTable.pagination,
	);
	const startItemPage = (currentPage - 1) * itemsPerPage + 1;
	const endItemPage = Math.min(currentPage * itemsPerPage, totalItems);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [sortConfig, setSortConfig] = useState<SortConfig>(null);

	const accessRowData = (row: T, key: string): ReactNode | undefined => {
		if (!row) return "";

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		return key.split(".").reduce((acc: any, key) => acc?.[key], row) as
			| ReactNode
			| undefined;
	};

	const filteredData = useAppSelector((state) => state.listTable.filteredData);

	const sortedData = useMemo(() => {
		if (!filteredData) return [];
		if (!sortConfig) {
			return filteredData; // Retorna os dados filtrados se não houver ordenação
		}

		// Cria uma cópia para não mutar o estado do Redux
		const sortableData = [...filteredData];

		sortableData.sort((a, b) => {
			const column = tableColumns?.find((c) => c.key === sortConfig.key);
			let aValue = accessRowData(a, sortConfig.key);
			let bValue = accessRowData(b, sortConfig.key);

			if ((aValue === undefined || bValue === undefined) && column?.render) {
				aValue = column.render(a);
				bValue = column.render(b);
			}

			// Trata valores nulos ou indefinidos (envia para o fim)
			if (aValue == null) return 1;
			if (bValue == null) return -1;

			let comparison = 0;
			if (typeof aValue === "number" && typeof bValue === "number") {
				comparison = aValue - bValue;
			} else if (typeof aValue === "string" && typeof bValue === "string") {
				const cleanA = aValue.trim();
				const cleanB = bValue.trim();

				comparison = cleanA.localeCompare(cleanB, "pt", {
					sensitivity: "base",
					numeric: true,
				});
			}
			// Fallback para outros tipos (datas como strings, etc.)
			else {
				const aStr = String(aValue);
				const bStr = String(bValue);
				comparison = aStr.localeCompare(bStr);
			}

			// Inverte a comparação se for 'desc'
			return sortConfig.direction === "asc" ? comparison : -comparison;
		});

		return sortableData;
	}, [filteredData, sortConfig]);

	const rowsToRender = sortedData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	const handleSort = (key: string) => {
		let direction: "asc" | "desc" = "asc";

		// Se já estiver ordenando por esta coluna
		if (sortConfig && sortConfig.key === key) {
			if (sortConfig.direction === "asc") {
				direction = "desc"; // Muda para descendente
			} else {
				setSortConfig(null); // Remove a ordenação (ciclo: asc -> desc -> null)
				return;
			}
		}
		// Se for uma nova coluna ou vindo de nulo
		setSortConfig({ key, direction });
	};

	// --- NOVO: Componente de ícone de ordenação ---
	const SortIcon = ({ columnKey }: { columnKey: string }) => {
		if (sortConfig?.key !== columnKey) {
			// Ícone neutro com opacidade
			return <ChevronsUpDown className="ml-1 h-4 w-4 opacity-30" />;
		}
		if (sortConfig.direction === "asc") {
			return <ArrowUp className="ml-1 h-4 w-4" />;
		}
		return <ArrowDown className="ml-1 h-4 w-4" />;
	};

	// define total items on rows change
	useEffect(() => {
		if (rows) {
			dispatch(setTotalItems(rows.length));
			// avoid losing original for pagination
			dispatch(setData(rows));
			dispatch(setFilteredData(rows));
			// Reseta a ordenação quando os dados mudam
			setSortConfig(null);
		}
	}, [rows]);

	// Clean on unmount
	useEffect(() => {
		return () => {
			dispatch(clearPagination());
			dispatch(clearData());
		};
	}, []);

	const handleDelete = async (id: string) => {
		try {
			setDeleteLoading(true);
			await onDelete?.(id);
		} finally {
			setDeleteLoading(false);
		}
	};

	const handlePageChange = (page: number) => {
		if (page < 1 || page > Math.ceil(totalItems / itemsPerPage)) return;
		dispatch(changePage(page));
	};

	const handleRowClick = (
		event: React.MouseEvent<HTMLTableRowElement>,
		id: string | number,
		row: T,
	) => {
		event.stopPropagation();
		if (onRowClick) onRowClick(id);
		if (onRowClickRowInfo) onRowClickRowInfo(row);
	};

	const handleEditClick = (
		event: React.MouseEvent<HTMLButtonElement>,
		id: string,
	) => {
		event.stopPropagation();
		onEdit?.(id);
	};

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex-1 overflow-auto">
				<Table {...tableProps}>
					<TableHeader>
						<TableRow>
							{tableColumns?.map((column) => (
								<TableHead
									key={column.key}
									{...column.cellProps}
									className={cn(
										"truncate cursor-pointer select-none", // Adiciona cursor e previne seleção
										column?.cellProps?.className,
									)}
									onClick={() => handleSort(column.key)} // Adiciona onClick
								>
									<div className="flex items-center gap-1">
										{column.label}
										<SortIcon columnKey={column.key} />
									</div>
								</TableHead>
							))}
							{onDelete && <TableHead className="w-8 p-0 text-center" />}
							{onEdit && <TableHead className="w-8 p-0 text-center" />}
						</TableRow>
					</TableHeader>
					<TableBody className="border-b">
						{rowsToRender?.map((row, idx) => (
							<TableRow
								key={row?.id ?? idx}
								className={cn(
									onRowClick || onRowClickRowInfo ? "cursor-pointer" : "",
								)}
								onClick={(e) => handleRowClick(e, row.id, row)}
							>
								{tableColumns?.map((column) =>
									column?.render ? (
										<TableCell key={`${column.key}+idx`} {...column.cellProps}>
											<span className="truncate line-clamp-1 block">
												{column?.render(row)}
											</span>
										</TableCell>
									) : (
										<TableCell key={`${column.key}+idx`} {...column.cellProps}>
											{column.badge && accessRowData(row, column.key) ? (
												<Badge
													variant={column.badgeProps?.variant ?? "default"}
													{...column.badgeProps}
												>
													{accessRowData(row, column.key)}
												</Badge>
											) : (
												<span className="truncate line-clamp-1 block">
													{accessRowData(row, column.key)}
												</span>
											)}
										</TableCell>
									),
								)}
								{/* render just if onDelete exists */}
								{onDelete && (
									<TableCell className="w-8 p-0 text-center">
										<EnsureDeleteModal
											loading={deleteLoading}
											onDelete={() => handleDelete(row.id)}
										>
											<Button
												size="icon"
												variant="ghost"
												className="text-destructive"
												onClick={(e) => e.stopPropagation()}
											>
												<Trash2 />
											</Button>
										</EnsureDeleteModal>
									</TableCell>
								)}
								{onEdit && (
									<TableCell className="w-8 p-0 text-center">
										<Button
											size="icon"
											variant="ghost"
											onClick={(e) => handleEditClick(e, row.id)}
										>
											<Pencil />
										</Button>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<footer
				{...footerWrapperProps}
				className={cn("border-t px-4 py-2", footerWrapperProps?.className)}
			>
				<div className="gap-8 flex justify-end">
					<div className="flex items-center text-muted-foreground text-xs">
						{startItemPage} - {endItemPage} de {totalItems}
					</div>
					<div className="flex gap-2 items-center">
						<Button
							variant="outline"
							size="icon"
							className="text-muted-foreground size-7"
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<ChevronLeft size={16} />
						</Button>

						<Button
							variant="outline"
							size="icon"
							className="text-muted-foreground size-7"
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
						>
							<ChevronRight size={16} />
						</Button>
					</div>
				</div>
			</footer>
		</div>
	);
}
