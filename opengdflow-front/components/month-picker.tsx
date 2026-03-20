// components/ui/month-picker.tsx

"use client";

import { addYears, format, subYears } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { type ComponentProps, type FC, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
// New imports for the Select component
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export interface MonthPickerProps
	extends Omit<ComponentProps<"button">, "onChange" | "value"> {
	value?: Date | null;
	onChange?: (date: Date | undefined | null) => void;
	placeholder?: string;
	placeholderFormat?: string;
	fromYear?: number;
	toYear?: number;
}

export const MonthPicker: FC<MonthPickerProps> = ({
	value,
	onChange,
	placeholder = "Selecione um mês",
	placeholderFormat: dateFormat = "MMM/yyyy",
	fromYear = new Date().getFullYear() - 20,
	toYear = new Date().getFullYear() + 10,
	className,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [viewedDate, setViewedDate] = useState(value ?? new Date());

	const handleMonthSelect = (monthIndex: number) => {
		const newDate = new Date(viewedDate.getFullYear(), monthIndex, 1);
		onChange?.(newDate);
		setIsOpen(false);
	};

	const handleYearChange = (year: string) => {
		setViewedDate(new Date(parseInt(year, 10), viewedDate.getMonth(), 1));
	};

	const currentYear = viewedDate.getFullYear();
	const months = Array.from({ length: 12 }, (_, i) => i);

	// Generate the list of years for the dropdown
	const years = Array.from(
		{ length: toYear - fromYear + 1 },
		(_, i) => fromYear + i,
	);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"pl-3 text-left font-normal w-full",
						value && "uppercase",
						!value && "text-muted-foreground",
						"aria-invalid:text-destructive aria-invalid:border-destructive",
						className,
					)}
					{...props}
				>
					{value ? (
						format(value, dateFormat, { locale: ptBR })
					) : (
						<span>{placeholder}</span>
					)}
					<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-auto p-2 space-y-2">
				{/* Updated Year Navigation Header */}
				<div className="flex items-center justify-center space-x-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setViewedDate(subYears(viewedDate, 1))}
						disabled={currentYear <= fromYear}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					{/* Year Dropdown Select */}
					<Select
						value={currentYear.toString()}
						onValueChange={handleYearChange}
					>
						<SelectTrigger size="sm" className="p-1.5 focus:ring-0 h-7">
							<SelectValue>{currentYear}</SelectValue>
						</SelectTrigger>
						<SelectContent position="popper">
							<ScrollArea className="h-80">
								{years.map((year) => (
									<SelectItem key={year} value={year.toString()}>
										{year}
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>

					<Button
						variant="ghost"
						size="icon"
						onClick={() => setViewedDate(addYears(viewedDate, 1))}
						disabled={currentYear >= toYear}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				{/* Month Selection Grid */}
				<div className="grid grid-cols-3 gap-2">
					{months.map((monthIndex) => (
						<Button
							key={monthIndex}
							variant="ghost"
							className={cn("text-sm", {
								"bg-primary text-primary-foreground":
									value?.getFullYear() === currentYear &&
									value?.getMonth() === monthIndex,
							})}
							onClick={() => handleMonthSelect(monthIndex)}
						>
							{format(new Date(currentYear, monthIndex), "MMM", {
								locale: ptBR,
							})}
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
