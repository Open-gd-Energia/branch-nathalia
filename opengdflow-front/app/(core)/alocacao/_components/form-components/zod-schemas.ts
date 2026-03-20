import { z } from "@/lib/zod-translation";

export const zodConsumidorVinculadoSchema = z.object({
	consumidor: z.object({
		id: z.coerce.number(),
		nome: z.string(),
		uc: z.string().optional(),
	}),
	consumo: z.coerce.number(),
	consumoRef: z.coerce.number(),
	quota: z.coerce.number(),
	quotaExcedente: z.coerce.number(),
});

export const zodAlocacaoSchema = z.object({
	id: z.coerce.number().optional(),

	usina: z.object({
		id: z.coerce.number(),
		nome: z.string(),
		uc: z.string().optional(),
	}),
	dataInicio: z.coerce.date(),
	dataFinal: z.coerce.date().optional().nullable(),
	status: z.string(),

	itens: z.array(zodConsumidorVinculadoSchema),

	observacao: z.string().optional(),
});

export type ZodAlocacaoFormData = z.infer<typeof zodAlocacaoSchema>;
export type ZodConsumidorVinculadoFormData = z.infer<
	typeof zodConsumidorVinculadoSchema
>;
