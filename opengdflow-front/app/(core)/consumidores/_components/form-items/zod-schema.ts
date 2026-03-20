import { zodAddressSchema } from "@/app/(core)/_components/address-form/zod-schema";
import {
	consumerClassifications,
	consumerStatuses,
	consumerTypes,
} from "@/lib/models/consumer";
import { representanteRelations } from "@/lib/models/contact";
import { usinaTipoConexaoOptions } from "@/lib/models/usina";

import { z } from "@/lib/zod-translation";

export const zodConsumerSchemaWithoutAddress = z.object({
	id: z.coerce.number().optional(),
	// basic-info
	nome: z.string().min(1),
	uc: z.string().min(1),
	classificacao: z.enum(
		Object.keys(consumerClassifications) as [string, ...string[]],
	),
	tipo: z.enum(Object.keys(consumerTypes) as [string, ...string[]]),
	status: z.enum(Object.keys(consumerStatuses) as [string, ...string[]]),

	// representantes
	representantes: z
		.array(
			z.object({
				representante: z.object({
					id: z.coerce.number().min(1),
					nome: z.string().min(1),
				}),
				relacao: z.enum(
					Object.keys(representanteRelations) as [string, ...string[]],
				),
			}),
		)
		.min(1, { message: "Deve haver pelo menos um representante" }),

	representanteTitular: z.object({
		id: z.coerce.number().min(1),
		nome: z.string().min(1),
	}),

	// informacoes-distribuidora
	distribuidora: z.object({
		id: z.coerce.number().min(1),
	}),
	loginDistribuidora: z.string().optional(),
	senhaDistribuidora: z.string().optional(),
	dataAssinaturaContrato: z.date().nullable().optional(),

	tipoConexao: z.enum(
		Object.keys(usinaTipoConexaoOptions) as [string, ...string[]],
	),

	// geracao-propria
	geracaoPropria: z.coerce.number().optional(),
	consumorReferenciaKwh: z.coerce.number().optional(),
});

export const zodConsumerSchema = z.intersection(
	zodConsumerSchemaWithoutAddress,
	zodAddressSchema,
);

export type ZodConsumerFormData = z.infer<typeof zodConsumerSchema>;
