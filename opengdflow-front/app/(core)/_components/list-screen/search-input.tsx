import debounce from "lodash.debounce";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux";
import { setFilteredData } from "@/lib/redux/features/list-table/slice";
import { cn } from "@/lib/utils";

export interface SearchInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	onSearch?: (value: string) => Promise<any[]>;
}

export const SearchInput: FC<SearchInputProps> = ({
	className,
	onSearch,
	...props
}) => {
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const router = useRouter();

	const [value, setValue] = useState(searchParams.get("search") ?? "");

	const debouncedSearch = useCallback(
		debounce(async (input: string) => {
			const response = await onSearch?.(input);
			if (response) {
				dispatch(setFilteredData(response));
			}

			const params = new URLSearchParams(window.location.search);
			if (input) {
				params.set("search", input);
			} else {
				params.delete("search");
			}

			router.replace(`?${params.toString()}`);
		}, 300),
		[dispatch, onSearch, router],
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setValue(newValue);
		debouncedSearch(newValue);
	};

	const handleClear = () => {
		setValue("");
		debouncedSearch("");
	};

	useEffect(() => {
		if (value && onSearch) debouncedSearch(value);
	}, []);

	return (
		<div className="relative w-full max-w-xs">
			<Input
				value={value}
				onChange={handleChange}
				placeholder="Pesquisar"
				className={cn("h-8 pr-8", className)}
				{...props}
			/>
			{value && (
				<button
					type="button"
					className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
					onClick={handleClear}
				>
					<X className="h-4 w-4" />
				</button>
			)}
		</div>
	);
};
