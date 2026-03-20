import { zodAddressSchema } from "@/app/(core)/_components/address-form/zod-schema";

import { representanteRelations } from "@/lib/models/contact";
import {
	usinaClassificacaoOptions,
	usinaStatusesOptions,
	usinaTensaoConexaoOptions,
	usinaTipoConexaoOptions,
} from "@/lib/models/usina";

import { z } from "@/lib/zod-translation";

export const zodUsinaSchemaWithoutAddress = z.object({
	id: z.coerce.number().optional(),
	// basic-info
	nome: z.string(),
	uc: z.string(),
	classificacao: z.enum(
		Object.keys(usinaClassificacaoOptions) as [string, ...string[]],
	),
	status: z.enum(Object.keys(usinaStatusesOptions) as [string, ...string[]]),

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
	loginDistribuidora: z.string(),
	senhaDistribuidora: z.string(),

	// configuracoes-tecnicas
	demandaPonta: z.coerce.number().min(0),
	demandaFPonta: z.coerce.number().min(0),
	potenciaNominal: z.coerce.number().min(0),
	pontenciaPico: z.coerce.number().min(0),
	tensaoConexao: z.enum(
		Object.keys(usinaTensaoConexaoOptions) as [string, ...string[]],
	),
	tipoConexao: z.enum(
		Object.keys(usinaTipoConexaoOptions) as [string, ...string[]],
	),

	// configuracoes-faturamento
	regraTarifaria: z.object({
		id: z.coerce.number().min(1),
		nome: z.string().optional().nullable(),
	}),
	faturamentoTipo: z.object({
		id: z.coerce.number().min(1),
		nome: z.string().optional().nullable(),
	}),
	valorKwh: z.coerce.number().min(0),

	// datas
	dataPrimeiraInjecao: z.date(),
	dataTrocaTitularidade: z.date().optional().nullable(),
	dataPrimeiroCadastro: z.date().optional().nullable(),
	dataPrevistaLeitura: z.date().optional().nullable(),

	// dados-bancarios
	conta: z.object({
		nomeTitular: z.string(),
		cpfCnpjTitular: z
			.string()
			.transform((value) => value.replace(/\D/g, ""))
			.refine(
				(value) => value?.length === 14 || value?.length === 11,
				"CPF/CNPJ inválido",
			),
		banco: z.object({
			id: z.coerce.number().min(1),
			nome: z.string(),
		}),
		agencia: z.string(),
		conta: z.string(),
		chavePix: z.string().optional().nullable(),
	}),
});

export const zodUsinaSchema = z.intersection(
	zodUsinaSchemaWithoutAddress,
	zodAddressSchema,
);

export type ZodUsinaFormData = z.infer<typeof zodUsinaSchema>;
