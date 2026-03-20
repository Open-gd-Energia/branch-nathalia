import type { API } from "../types/api";

type PrevisaoResponseAPI = API["schemas"]["PrevisaoResponse"];

export interface Previsao extends PrevisaoResponseAPI {}
