import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { fetchDiscountTypes } from "@/app/(core)/config/tipos-desconto/_services/fetch";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { DiscountTypes } from "@/lib/models/discount-types";
import type { ZodCobrancaReceberFormData } from "../zod-schemas";

export const RegrasCobranca = () => {
	const { data: discountTypes, isLoading } = useQuery({
		queryKey: ["discount-types-list"],
		queryFn: () => fetchDiscountTypes(),
	});
	const form = useFormContext<ZodCobrancaReceberFormData>();

	return (
		<FormField
			control={form.control}
			name="tipoDescontoItem"
			render={({ field }) => (
				<FormItem className="w-full">
					<FormControl>
						<RadioGroup
							onValueChange={(id) =>
								field.onChange({ id: Number.parseInt(id, 10) })
							}
							defaultValue={field.value?.id?.toString()}
							className="flex flex-col gap-2"
						>
							{isLoading && (
								<Loader2 className="animate-spin mx-auto size-6 text-muted-foreground" />
							)}
							{discountTypes?.map((discountType) => (
								<RadioItem
									key={discountType.id}
									{...discountType}
									id={discountType.id ? Number(discountType.id) : undefined}
								/>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export const RadioItem: FC<DiscountTypes> = ({ id, nome, descricao }) => {
	if (!id || !nome) {
		return null;
	}

	return (
		<FormItem className="flex w-full p-4 border items-start rounded-md space-x-2">
			<FormControl>
				<RadioGroupItem
					className="mt-[2px]"
					value={id.toString()}
					id={id.toString()}
				/>
			</FormControl>
			<FormLabel
				htmlFor={id.toString()}
				className="flex flex-col flex-1 gap-1 items-start mb-0"
			>
				<span className="text-sm font-medium">{nome}</span>
				<span className="text-sm leading-5 text-muted-foreground line-clamp-1">
					{descricao ?? nome}
				</span>
			</FormLabel>
		</FormItem>
	);
};
