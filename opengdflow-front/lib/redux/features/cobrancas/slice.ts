import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cobranca } from "@/lib/models/cobranca";

export interface CobrancasFilters {
	idTipoDescontoItem?: number | null;
	idUsina?: string | number | null;
	idConsumidor?: string | number | null;
	identificador?: string | null;
	tipo?: "PAGAR" | "RECEBER";
	referenciaInicial?: string | null;
	referenciaFinal?: string | null;
	status?: string | null;
}

export interface CobrancasState {
	sheet: {
		open: boolean;
		data: Cobranca | null;
		faturaView: boolean;
	};
	visualization: "list" | "grid";
	filters: CobrancasFilters;
}

const initialState: CobrancasState = {
	sheet: {
		open: false,
		data: null,
		faturaView: false,
	},
	visualization: "list",
	filters: {},
};

export const cobrancaSlice = createSlice({
	name: "cobrancas",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setCobrancaPagarVisualization: (
			state,
			{ payload }: PayloadAction<"list" | "grid">,
		) => {
			state.visualization = payload;
		},
		toggleOpenCobrancasPagarSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setCobrancaPagarData: (
			state,
			{ payload }: PayloadAction<Cobranca | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanCobrancaPagarData: (state) => {
			state.sheet.data = null;
		},
		setCobrancaPagarFilters: (
			state,
			{ payload }: PayloadAction<CobrancasFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.filters = initialState.filters;
			} else {
				state.filters = payload;
			}
		},
		clearCobrancaPagarFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	toggleOpenCobrancasPagarSheet,
	cleanCobrancaPagarData,
	setCobrancaPagarData,
	setCobrancaPagarFilters,
	clearCobrancaPagarFilters,
	setCobrancaPagarVisualization,
} = cobrancaSlice.actions;

export default cobrancaSlice.reducer;
