import type { API } from "../types/api";

type DistribuidoraAPI = API["schemas"]["DistribuidoraResponse"];

export interface Distribuitors extends Omit<DistribuidoraAPI, "id"> {
	id: string | number;
}
