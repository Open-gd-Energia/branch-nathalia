import { z } from "@/lib/zod-translation";

// ——————————————————————————————————————————————
// 1) Address‐only schema
// ——————————————————————————————————————————————
export const addressOnlySchema = z.object({
	endereco: z.object({
		cep: z
			.string({ required_error: "CEP é obrigatório" })
			// strip all non‐digits
			.transform((val) => val.replace(/\D/g, ""))
			// must be exactly 8 digits
			.refine((val) => val.length === 8, { message: "CEP inválido" }),
		endereco: z.string().nonempty(),
		numero: z.string().optional().nullable(),
		bairro: z.string().nonempty(),
		complemento: z.string().optional().nullable(),
		cidade: z.object({
			id: z.number().optional(),
			idIbge: z.string(),
			nome: z.string(),
			uf: z.string(),
		}),
	}),
});

// ——————————————————————————————————————————————
// 2) Coords‐only schema
// ——————————————————————————————————————————————
export const coordsOnlySchema = z.object({
	endereco: z.object({
		latitude: z.coerce.number(),
		longitude: z.coerce.number(),
	}),
});

export const baseAddressSchema = z.object({
	addressType: z.enum(["address", "coordinates"]),
});

const addressWithFullAddress = baseAddressSchema
	.extend({ addressType: z.literal("address") })
	.merge(addressOnlySchema);

// — When addressType === "coords" merge in just latitude/longitude
const addressWithCoords = baseAddressSchema
	.extend({ addressType: z.literal("coordinates") })
	.merge(coordsOnlySchema);

export const zodAddressSchema = z.discriminatedUnion("addressType", [
	addressWithFullAddress,
	addressWithCoords,
]);

export type AddressOnlySchema = z.infer<typeof addressOnlySchema>;
export type CoordsOnlySchema = z.infer<typeof coordsOnlySchema>;
export type AddressSchema = z.infer<typeof zodAddressSchema>;
