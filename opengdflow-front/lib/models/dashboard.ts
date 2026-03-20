import type { API } from "../types/api";

type APIDashboardResumoGeralResponse =
	API["schemas"]["DashboardResumoGeralResponse"];
type APIDashboardEnergiaGeradaConsumidaResponse =
	API["schemas"]["DashboardEnergiaGeradaConsumidaResponse"];

export interface DashboardResumoGeral extends APIDashboardResumoGeralResponse {}

export interface DashboardEnergiaGeradaConsumida
	extends APIDashboardEnergiaGeradaConsumidaResponse {}
