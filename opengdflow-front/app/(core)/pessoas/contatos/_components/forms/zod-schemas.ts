import { zodAddressSchema } from "@/app/(core)/_components/address-form/zod-schema";
import { tipoPessoaOptions } from "@/lib/models/contact";
import { z } from "@/lib/zod-translation";

export const documentsSchema = z.object({
	documentos: z.array(
		z.object({
			id: z.coerce.number().optional(),
			nome: z.string(),
			tipo: z.string(),
			base64: z.string().optional().nullable(),
			tamanho: z.number(),
		}),
	),
});

export type DocumentsSchema = z.infer<typeof documentsSchema>;

export const pfSchema = z.object({
	pessoaFisica: z.object({
		nome: z.string(),
		rg: z
			.string()
			.transform((value) => value.replace(/\D/g, ""))
			.refine(
				(value) => value?.length <= 9 && value?.length >= 7,
				"RG inválido",
			),
		cpf: z
			.string()
			.transform((value) => value.replace(/\D/g, ""))
			.refine((value) => value?.length === 11, "CPF inválido"),
		profissao: z.string(),
		nacionalidade: z.string(),
		estadoCivil: z.string(),
		dataNascimento: z.date(),
	}),
});

export type PFSchema = z.infer<typeof pfSchema>;

export type PJSchema = z.infer<typeof pjSchema>;

export const pjSchema = z.object({
	pessoaJuridica: z.object({
		razaoSocial: z.string(),
		nomeFantasia: z.string(),
		cnpj: z
			.string()
			// Updated to keep letters and numbers, removing only symbols
			.transform((value) => value.replace(/[^a-zA-Z0-9]/g, ""))
			.refine((value) => value?.length === 14, "CNPJ inválido"),
		inscricaoEstadual: z.string().optional().nullable(),
	}),
});

export type BaseContactSchema = z.infer<typeof baseContactSchema>;

export const baseContactSchema = z
	.object({
		status: z.coerce.number().optional().default(1),
		id: z.coerce.number().optional(),
		tipoPessoa: z
			.enum(Object.keys(tipoPessoaOptions) as [string, ...string[]])
			.default("PESSOA_FISICA"),
		telefone: z
			.string()
			.transform((value) => value.replace(/\D/g, ""))
			.refine((value) => value?.length === 11, "Telefone inválido"),
		email: z.string().email(),
	})
	.merge(documentsSchema);

export const pfContactSchema = baseContactSchema
	.extend({
		tipoPessoa: z.literal("PESSOA_FISICA"),
	})
	.merge(pfSchema);

export const pjContactSchema = baseContactSchema
	.extend({
		tipoPessoa: z.literal("PESSOA_JURIDICA"),
	})
	.merge(pjSchema);

export const gestoraContactSchema = baseContactSchema
	.extend({
		tipoPessoa: z.literal("GESTORA"),
	})
	.merge(pjSchema);

export type PJContactSchema = z.infer<typeof pjContactSchema>;
export type PFContactSchema = z.infer<typeof pfContactSchema>;

export const contactWithPersonSchema = z.discriminatedUnion("tipoPessoa", [
	pfContactSchema,
	pjContactSchema,
	gestoraContactSchema,
]);

export const zodContactSchema = z.intersection(
	contactWithPersonSchema,
	zodAddressSchema,
);

export type ZodContactSchema = z.infer<typeof zodContactSchema>;
