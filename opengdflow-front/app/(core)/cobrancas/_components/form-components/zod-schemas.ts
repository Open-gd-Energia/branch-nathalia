import { cobrancaStatuses } from "@/lib/models/cobranca";
import { z } from "@/lib/zod-translation";

export const zodBaseCobrancaSchema = z.object({
	id: z.coerce.number().optional(),

	tipo: z.enum(["PAGAR", "RECEBER"]),
	identificador: z.string(),
	mesReferencia: z.date(),
	dataVencimento: z.date(),
	dataEmissao: z.date(),
	status: z.enum(Object.keys(cobrancaStatuses) as [string, ...string[]]),
	energiaCompensada: z.coerce.number(),
	tarifaEnergiaCompensada: z.coerce.number().optional().nullable(),
	valorTotal: z.coerce.number(),
	economiaGerada: z.coerce.number().optional().nullable(),
	energiaInjetada: z.coerce.number(),

	linhaDigitavel: z.string().optional().nullable(),

	// descontos
	// acrescimos
	itens: z
		.array(
			z.object({
				nome: z.string(),
				descricao: z.string(),
				valor: z.coerce.number(),
				tipo: z.enum(["ACRESCIMO", "DESCONTO"]),
			}),
		)
		.optional()
		.nullable(),

	observacao: z.string().optional().nullable(),
});

export const zodCobrancaPagarSchema = zodBaseCobrancaSchema
	.extend({ tipo: z.literal("PAGAR") })
	.merge(
		z.object({
			usina: z.object({
				id: z.coerce.number(),
				nome: z.string(),
				uc: z.string().optional(),
			}),
			consumoLocal: z.coerce.number(),
			tarifaConsumoLocal: z.coerce.number().optional().nullable(),
			energiaDistribuida: z.coerce.number(),
			tarifaEnergiaDistribuida: z.coerce.number().optional().nullable(),
			valorTotalDistribuidora: z.coerce.number(),
		}),
	);

export const zodCobrancaReceberSchema = zodBaseCobrancaSchema
	.extend({ tipo: z.literal("RECEBER") })
	.merge(
		z.object({
			consumidor: z.object({
				id: z.coerce.number(),
				nome: z.string(),
				uc: z.string().optional(),
			}),
			consumoTotal: z.coerce.number(),
			tarifaComImposto: z.coerce.number(),
			tarifaSemImposto: z.coerce.number(),
			tarifaDesconto: z.coerce.number(),
			saldoCreditos: z.coerce.number(),

			consumoCompensavel: z.coerce.number().optional().nullable(),
			tarifaConsumoCompensavel: z.coerce.number().optional().nullable(),
			adicionalBandeira: z.coerce.number().optional().nullable(),
			tarifaAdicionalBandeira: z.coerce.number().optional().nullable(),

			tipoDescontoItem: z
				.object({
					id: z.coerce.number().optional(),
				})
				.optional()
				.nullable(),
		}),
	);

export const zodCobrancaSchema = z.discriminatedUnion("tipo", [
	zodCobrancaPagarSchema,
	zodCobrancaReceberSchema,
]);

export type ZodCobrancaPagarFormData = z.infer<typeof zodCobrancaPagarSchema>;
export type ZodCobrancaReceberFormData = z.infer<
	typeof zodCobrancaReceberSchema
>;
export type ZodCobrancaFormData = z.infer<typeof zodCobrancaSchema>;
