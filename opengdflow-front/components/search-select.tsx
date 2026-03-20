"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type BaseOption = { id: string | number; nome?: string };

// ——— Props definitions ———
export interface SingleProps<T extends BaseOption> {
	multiple?: false; // discriminant
	options: T[];
	value: T | null;
	onValueChange?: (v: T | null) => void;
	loading?: boolean;
}

export interface MultiProps<T extends BaseOption> {
	multiple: true; // discriminant
	options: T[];
	value: T[];
	onValueChange?: (v: T[]) => void;
	loading?: boolean;
}

export type SearchSelectProps<T extends BaseOption> =
	| SingleProps<T>
	| MultiProps<T>;

// ——— Type-guard ———
function isMulti<T extends BaseOption>(
	props: SearchSelectProps<T>,
): props is MultiProps<T> {
	return props.multiple === true;
}

// ——— Component ———
export function SearchSelect<T extends BaseOption>(
	props: SearchSelectProps<T>,
) {
	const { options, loading = false } = props;
	const [open, setOpen] = useState(false);

	// narrow at runtime:
	const multi = isMulti(props);

	// unify for rendering badges:
	const selectedArray: T[] = multi
		? props.value
		: props.value
			? [props.value]
			: [];

	const handleSelect = useCallback(
		(opt: T) => {
			if (multi) {
				// here TS knows onValueChange expects T[]
				const curr = props.value;
				const exists = curr.some((v) => v.id === opt.id);
				const next = exists
					? curr.filter((v) => v.id !== opt.id)
					: [...curr, opt];
				props.onValueChange?.(next);
			} else {
				// here TS knows onValueChange expects T|null
				props.onValueChange?.(opt);
				setOpen(false);
			}
		},
		[multi, props],
	);

	const handleRemove = useCallback(
		(id: T["id"]) => {
			if (multi) {
				props.onValueChange?.(props.value.filter((v) => v.id !== id));
			} else {
				props.onValueChange?.(null);
			}
		},
		[multi, props],
	);

	return (
		<Popover modal open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					{...(props as any)}
					variant="outline"
					aria-expanded={open}
					className={cn(
						"w-full justify-between hover:bg-background h-auto py-2",
						"aria-invalid:text-destructive aria-invalid:border-destructive",
					)}
					disabled={loading}
				>
					{selectedArray.length ? (
						<div className="flex flex-wrap gap-1">
							{selectedArray.map((item) => (
								<Badge key={item.id} variant="secondary">
									<span className="max-w-32 truncate">{item.nome}</span>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<span
													className="ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
													onClick={(e) => {
														e.stopPropagation();
														handleRemove(item.id);
													}}
												>
													<X className="h-3 w-3" />
												</span>
											</TooltipTrigger>
											<TooltipContent>Remover {item.nome}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Badge>
							))}
						</div>
					) : (
						<span className="text-muted-foreground">Selecione</span>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-full p-0" align="start">
				<Command className="max-h-[300px] overflow-auto relative">
					<CommandInput placeholder="Buscar..." className="h-9" />
					<CommandList className="max-h-[250px] overflow-auto">
						<CommandEmpty>Nenhum item encontrado.</CommandEmpty>
						<CommandGroup>
							{options.map((opt) => {
								const isSel = selectedArray.some((v) => v.id === opt.id);
								return (
									<CommandItem
										key={opt.id}
										value={opt.nome}
										onSelect={() => handleSelect(opt)}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												isSel
													? "bg-primary text-primary-foreground"
													: "opacity-50",
											)}
										>
											{isSel && <Check className="h-3 w-3" />}
										</div>
										<span>{opt.nome}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
