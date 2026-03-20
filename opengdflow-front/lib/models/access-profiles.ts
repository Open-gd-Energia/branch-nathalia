import type { Permission } from "./permission";

export interface AccessProfile {
	id: string;
	nome: string;
	permissoes: Permission[];
	tipo?: string;
}
