"use client";

import { useFormContext } from "react-hook-form";

import { DiscountAddItems } from "@/app/(core)/faturas/_components/form-components/discount-add-items";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DadosCalculoPagar } from "./pagar/dados-calculo";
import { PagarBasicInfo } from "./pagar-basic-info";
import type { ZodCobrancaFormData } from "./zod-schemas";

export const CobrancaPagarForm = () => {
	const form = useFormContext<ZodCobrancaFormData>();
	return (
		<>
			<section id="basic-info" className="flex flex-col gap-4">
				<h3 className="font-semibold leading-7 mb-1">1. Informações Básicas</h3>
				<PagarBasicInfo />
			</section>

			<Separator className="my-3" />

			<section id="itens-eventuais" className="flex flex-col gap-4">
				<h3 className="font-semibold leading-7 mb-1">2. Itens Eventuais</h3>
				<DiscountAddItems />
			</section>

			<Separator className="my-3" />

			<section id="dados-calculo" className="flex flex-col gap-4">
				<h3 className="font-semibold leading-7 mb-1">3. Dados de Cálculo</h3>
				<DadosCalculoPagar />
			</section>

			<Separator className="my-3" />

			<section id="observacoes" className="flex flex-col gap-4">
				<h3 className="font-semibold leading-7 mb-1">4. Observações</h3>

				<FormField
					control={form.control}
					name="observacao"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Observações</FormLabel>
							<FormControl>
								<Textarea {...field} value={field.value ?? undefined} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</section>
		</>
	);
};
