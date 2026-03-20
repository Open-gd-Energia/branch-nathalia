import { z } from "@/lib/zod-translation";

/** Backend: numeric(19, 4) → máx. 15 dígitos inteiros + 4 decimais. Evita DataIntegrityViolationException. */
const MAX_19_4 = 10 ** 15; // 1e15 (em JS equivale ao limite seguro para 15 dígitos inteiros)
/** Backend: numeric(19, 2) → máx. 17 dígitos inteiros + 2 decimais. */
const MAX_19_2 = 10 ** 17;

const msgPrecision19_4 =
	"Máximo 15 dígitos inteiros e 4 decimais (ex.: 999999999999999,9999)";
const msgPrecision19_2 =
	"Máximo 17 dígitos inteiros e 2 decimais (ex.: valor em R$)";

/** Número para medições de energia e tarifas (R$/kWh): precision 19, scale 4. */
const numberEnergyTariff = () =>
	z.coerce
		.number()
		.min(0, "Deve ser ≥ 0")
		.refine((n) => n <= MAX_19_4, msgPrecision19_4);

/** Número para valores financeiros (BRL): precision 19, scale 2. */
const numberCurrency = () =>
	z.coerce
		.number()
		.min(0, "Deve ser ≥ 0")
		.refine((n) => n <= MAX_19_2, msgPrecision19_2);

export const zodInvoiceSchema = z
	.object({
		id: z.coerce.number().optional(),
		numeroFatura: z.string(),

		// Make both fields optional and nullable to handle empty states
		usina: z
			.object({
				id: z.coerce.number(),
				nome: z.string().optional(),
			})
			.optional()
			.nullable(),

		consumidor: z
			.object({
				id: z.coerce.number(),
				nome: z.string().optional(),
			})
			.optional()
			.nullable(),
		unidadeConsumidoraUsina: z.string().optional(),

		unidadeConsumidoraConsumidor: z.string().optional(),

		mesReferencia: z.date(),
		vencimento: z.date(),
		dataLeituraAtual: z.date(),
		proximaLeitura: z.date(),

		energiaInjetada: numberEnergyTariff(),
		consumoLocalUsina: numberEnergyTariff().optional().nullable(),

		energiaConpensadaLocal: numberEnergyTariff(),
		energiaDistribuida: numberEnergyTariff().optional().nullable(),

		saldoAcumuladoAnterior: numberEnergyTariff(),
		saldoAcumuladoAtual: numberEnergyTariff(),

		tarifaTESI: numberEnergyTariff().optional(),
		tarifaTUSDSI: numberEnergyTariff().optional(),
		tarifaTotalSI: numberEnergyTariff().optional(),
		tarifaTECI: numberEnergyTariff().optional(),
		tarifaTUSDCI: numberEnergyTariff().optional(),
		tarifaTotalCI: numberEnergyTariff().optional(),
		tarifaTECompensavel: numberEnergyTariff().optional(),
		tarifaTUSDCompensavel: numberEnergyTariff().optional(),
		tarifaTotalCompensavel: numberEnergyTariff().optional(),

		valorIcms: numberCurrency().optional(),
		valorPis: numberCurrency().optional(),
		valorConfins: numberCurrency().optional(),

		valorTotalFatura: numberCurrency(),
		valorEnergiaCompensada: numberCurrency().optional(),
		creditoDistribuidos: numberEnergyTariff().optional().nullable(),

		// pdf file item
		faturaPDF: z.string().optional().nullable(),

		// descontos
		// acrescimos
		itens: z
			.array(
				z.object({
					nome: z.string(),
					descricao: z.string(),
					valor: numberCurrency(),
					tipo: z.enum(["ACRESCIMO", "DESCONTO"]),
				}),
			)
			.optional()
			.nullable(),

		// novos campos
		leituraAtualConsumo: numberEnergyTariff().optional(),
		leituraAtualGeracao: numberEnergyTariff().optional(),
		consumo: numberEnergyTariff().optional(),
		tarifaBandVermelhaP1SI: numberEnergyTariff().optional(),
		tarifaBandVermelhaP1CI: numberEnergyTariff().optional(),
		tarifaBandVermelhaP2SI: numberEnergyTariff().optional(),
		tarifaBandVermelhaP2CI: numberEnergyTariff().optional(),
		tarifaBandAmarelaSI: numberEnergyTariff().optional(),
		tarifaBandAmarelaCI: numberEnergyTariff().optional(),
		tarifaBandVermelhaP1Compensavel: numberEnergyTariff().optional(),
		tarifaBandVermelhaP2Compensavel: numberEnergyTariff().optional(),
		tarifaBandAmarelaCompensavel: numberEnergyTariff().optional(),
		historicoFaturamentos: z.array(
			z.object({
				dias: z.coerce.number().int().min(0),
				energiaAtiva: numberEnergyTariff(),
				data: z.coerce.date(),
			}),
		),

		observacao: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		const { usina, consumidor } = data;

		if (!usina && !consumidor) {
			const errorMessage =
				"É necessário selecionar uma usina ou um consumidor.";

			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: errorMessage,
				path: ["usina"],
			});

			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: errorMessage,
				path: ["consumidor"],
			});
		}

		if (usina && consumidor) {
			const message =
				"Selecione apenas uma opção: usina ou consumidor, não ambos.";

			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: message,
				path: ["usina"],
			});

			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: message,
				path: ["consumidor"],
			});
		}
	});

export type ZodInvoiceFormData = z.infer<typeof zodInvoiceSchema>;
