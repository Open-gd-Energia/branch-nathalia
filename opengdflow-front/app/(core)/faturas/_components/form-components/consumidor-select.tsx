import { useFormContext } from "react-hook-form";
import { ConsumidorSelect as GlobalConsumerSelect } from "@/app/(core)/_components/consumidor-select";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { Consumer } from "@/lib/models/consumer";
import type { ZodInvoiceFormData } from "./zod-schemas";

export const ConsumidorSelect = () => {
	const form = useFormContext<ZodInvoiceFormData>();

	const handleChange = (value: Consumer | null) => {
		if (!value) return;
		form.setValue("unidadeConsumidoraConsumidor", value?.uc);
	};

	return (
		<FormField
			control={form.control}
			name="consumidor"
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>Consumidor</FormLabel>
					<FormControl>
						<GlobalConsumerSelect
							{...field}
							value={field.value as Consumer}
							onValueChange={(value: Consumer | null) => {
								handleChange(value as Consumer);
								return field.onChange(value);
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
