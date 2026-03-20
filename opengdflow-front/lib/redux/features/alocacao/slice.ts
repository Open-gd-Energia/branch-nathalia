import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Alocacao } from "@/lib/models/alocacao";

export interface AlocacaoFilters {
	idUsina?: string | number | null;
	dataInicio?: string | null;
	dataFinal?: string | null;
	status?: string | null;
}

export interface AlocacaoItemFilters {
	idUsina?: string | number | null;
	idConsumidor?: string | number | null;
	status?: string | null;
	nomeConsumidor?: string | null;
	nomeUsina?: string | null;
}

export interface AlocacaoAState {
	sheet: {
		open: boolean;
		data: Alocacao | null;
	};
	filters: AlocacaoFilters;
	alocacaoItemFilters: AlocacaoItemFilters;
}

const initialState: AlocacaoAState = {
	sheet: {
		open: false,
		data: null,
	},
	filters: {},
	alocacaoItemFilters: {},
};

export const alocacaoSlice = createSlice({
	name: "alocacao",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenAlocacaoSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setAlocacaoData: (
			state,
			{ payload }: PayloadAction<Alocacao | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanAlocacaoData: (state) => {
			state.sheet.data = null;
		},
		setAlocacaoFilters: (
			state,
			{ payload }: PayloadAction<AlocacaoFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.filters = initialState.filters;
			} else {
				state.filters = payload;
			}
		},
		setAlocacaoItemFilters: (
			state,
			{ payload }: PayloadAction<AlocacaoItemFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.alocacaoItemFilters = initialState.alocacaoItemFilters;
			} else {
				state.alocacaoItemFilters = payload;
			}
		},
		clearAlocacaoItemFilters: (state) => {
			state.alocacaoItemFilters = initialState.alocacaoItemFilters;
		},
		clearAlocacaoFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	toggleOpenAlocacaoSheet,
	cleanAlocacaoData,
	setAlocacaoData,
	setAlocacaoFilters,
	clearAlocacaoFilters,
	clearAlocacaoItemFilters,
	setAlocacaoItemFilters,
} = alocacaoSlice.actions;

export default alocacaoSlice.reducer;
