"use client";

import { format, isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { type ComponentProps, type FC, useEffect, useState } from "react";
import type { DayPickerSingleProps } from "react-day-picker";
import { withMask } from "use-mask-input";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// The props are now based on an <input> element instead of a <button>
export interface DatepickerProps
	extends Omit<ComponentProps<"input">, "onChange" | "value"> {
	value?: Date | null;
	onChange?: (date: Date | undefined | null) => void;
	placeholder?: string;
	placeholderFormat?: string;
	calendarProps: Omit<DayPickerSingleProps, "onSelect" | "mode" | "className">;
}

export const Datepicker: FC<DatepickerProps> = ({
	value,
	onChange,
	placeholder = "Selecione uma data",
	placeholderFormat: dateFormat = "dd/MM/yyyy",
	calendarProps: { defaultMonth, ...calendarProps },
	className,
	...props
}) => {
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");

	// Ref for the masked input from use-mask-input
	const inputRef = withMask("99/99/9999", {});

	// This effect syncs the external `value` prop with our internal `inputValue`
	// This is useful when the date is changed from outside the component
	useEffect(() => {
		if (value) {
			setInputValue(format(value, dateFormat, { locale: ptBR }));
		}
	}, [value, dateFormat]);

	// Handles the change event when a user types in the input
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const typedValue = e.target.value;
		setInputValue(typedValue);

		// When the input is cleared, we should notify the parent
		if (!typedValue) {
			onChange?.(null);
			return;
		}

		// We only try to parse and update the date when it's fully typed
		if (typedValue.length === 10 && !typedValue.includes("_")) {
			const parsedDate = parse(typedValue, dateFormat, new Date());

			// If the typed date is valid (e.g., not "99/99/9999")
			if (isValid(parsedDate)) {
				// We only call onChange if the new date is different from the current one
				if (value?.getTime() !== parsedDate.getTime()) {
					onChange?.(parsedDate);
				}
			} else {
				// If the date is invalid, we can pass `undefined` to signal this to the parent form
				onChange?.(null);
			}
		} else {
			// If the date is not fully typed, we can pass `undefined` to signal this to the parent form
			onChange?.(null);
		}
	};

	// Handles the date selection from the calendar UI
	const handleDateSelect = (date: Date | undefined) => {
		setOpen(false); // Close the popover on selection
		if (date) {
			onChange?.(date);
			setInputValue(format(date, dateFormat, { locale: ptBR }));
		}
	};

	return (
		<Popover open={open} onOpenChange={setOpen} modal>
			<div className="relative w-full">
				<Input
					{...props}
					ref={inputRef}
					value={inputValue}
					onChange={handleInputChange}
					placeholder={placeholder}
					className={cn(
						"pl-3 pr-10 text-left font-normal w-full",
						!value && "text-muted-foreground",
						"aria-invalid:text-destructive aria-invalid:border-destructive",
						className,
					)}
				/>
				<PopoverTrigger asChild>
					<CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
				</PopoverTrigger>
			</div>
			<PopoverContent align="end" className="w-auto p-0">
				<Calendar
					mode="single"
					captionLayout="dropdown-buttons"
					locale={ptBR}
					selected={value ?? undefined}
					onSelect={handleDateSelect}
					defaultMonth={defaultMonth ?? value ?? undefined}
					{...calendarProps}
				/>
			</PopoverContent>
		</Popover>
	);
};
