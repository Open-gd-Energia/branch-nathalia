import type { API } from "../types/api";

type DocumentResponseApi = API["schemas"]["DocumentoResponse"];
type DocumentoArquivoResponseAPI = API["schemas"]["DocumentoFileResponse"];
type DocumentRequestApi = API["schemas"]["DocumentoRequest"];

export interface DocumentoArquivo extends DocumentoArquivoResponseAPI {}
export interface Documento extends DocumentResponseApi {}
export interface DocumentoRequest extends DocumentRequestApi {}
