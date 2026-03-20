import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Geracao } from "@/lib/models/geracao";

export type GeracaoFilters = {
	idUsina?: string | null;
	mesReferencia?: string | null;
};

export interface GeracaoState {
	sheet: {
		open: boolean;
		data: Geracao | null;
	};
	filters: GeracaoFilters;
}

const initialState: GeracaoState = {
	sheet: {
		open: false,
		data: null,
	},
	filters: {},
};

export const geracaoSlice = createSlice({
	name: "geracao",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenGeracaoSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setGeracaoData: (
			state,
			{ payload }: PayloadAction<Geracao | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanGeracaoData: (state) => {
			state.sheet.data = null;
		},
		setGeracaoFilters: (
			state,
			{ payload }: PayloadAction<GeracaoFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.filters = initialState.filters;
			} else {
				state.filters = payload;
			}
		},
		clearGeracaoFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	toggleOpenGeracaoSheet,
	cleanGeracaoData,
	setGeracaoData,
	setGeracaoFilters,
	clearGeracaoFilters,
} = geracaoSlice.actions;

export default geracaoSlice.reducer;
