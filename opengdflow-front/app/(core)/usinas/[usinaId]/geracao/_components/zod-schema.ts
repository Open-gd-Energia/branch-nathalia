import { z } from "@/lib/zod-translation";

export const zodGeracaoSchema = z.object({
	id: z.coerce.number().optional(),

	usina: z.object({
		id: z.coerce.number(),
	}),

	mesReferencia: z.date(),
	dataCadastro: z.date(),

	valorConsumoInformado: z.coerce.number(),
	valorGeracaoInformado: z.coerce.number(),
	valorCreditoDistribuido: z.coerce.number(),
	valorEnergiaCompensada: z.coerce.number(),
});

export type ZodGeracaoFormData = z.infer<typeof zodGeracaoSchema>;
