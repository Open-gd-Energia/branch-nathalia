import { z } from "@/lib/zod-translation";

export const zodPrevisaoSchema = z.object({
	id: z.coerce.number().optional(),

	usina: z.object({
		id: z.coerce.number(),
	}),

	mesReferencia: z.date(),
	geracaoPrevista: z.coerce.number(),
	consumoPrevisto: z.coerce.number(),
	geracaoMediaPrevista: z.coerce.number(),
	consumoMedioPrevisto: z.coerce.number(),
});

export type ZodPrevisaoFormData = z.infer<typeof zodPrevisaoSchema>;
