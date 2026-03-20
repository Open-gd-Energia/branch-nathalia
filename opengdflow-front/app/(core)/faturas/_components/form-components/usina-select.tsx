import { useFormContext } from "react-hook-form";
import { UsinaSelect as UsinaSelectComponent } from "@/app/(core)/_components/usina-select";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { Usina } from "@/lib/models/usina";
import type { ZodInvoiceFormData } from "./zod-schemas";

export const UsinaSelect = () => {
	const form = useFormContext<ZodInvoiceFormData>();

	const handleChange = (value: Usina | null) => {
		if (!value) return;
		form.setValue("unidadeConsumidoraUsina", value?.uc);
	};

	return (
		<FormField
			control={form.control}
			name="usina"
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>Usina</FormLabel>
					<FormControl>
						<UsinaSelectComponent
							onValueChange={(value: Usina | null) => {
								handleChange(value);
								return field.onChange(value);
							}}
							value={field.value as Usina | null}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
