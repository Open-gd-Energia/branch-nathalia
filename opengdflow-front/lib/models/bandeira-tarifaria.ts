import type { API } from "../types/api";

type BandeiraTarifariaAPI = API["schemas"]["BandeiraTarifariaResponse"];

export interface BandeiraTarifaria
	extends Omit<BandeiraTarifariaAPI, "id" | "nome"> {
	id: number;
	nome: string;
}
