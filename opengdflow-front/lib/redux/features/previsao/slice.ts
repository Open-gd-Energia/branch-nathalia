import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Previsao } from "@/lib/models/previsao";

export type PrevisaoFilters = {
	idUsina?: string | null;
	mesReferencia?: string | null;
};

export interface PrevisaoState {
	sheet: {
		open: boolean;
		data: Previsao | null;
	};
	filters: PrevisaoFilters;
}

const initialState: PrevisaoState = {
	sheet: {
		open: false,
		data: null,
	},
	filters: {},
};

export const previsaoSlice = createSlice({
	name: "previsao",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenPrevisaoSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setPrevisaoData: (
			state,
			{ payload }: PayloadAction<Previsao | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanPrevisaoData: (state) => {
			state.sheet.data = null;
		},
		setPrevisaoFilters: (
			state,
			{ payload }: PayloadAction<PrevisaoFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.filters = initialState.filters;
			} else {
				state.filters = payload;
			}
		},
		clearPrevisaoFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	toggleOpenPrevisaoSheet,
	cleanPrevisaoData,
	setPrevisaoData,
	setPrevisaoFilters,
	clearPrevisaoFilters,
} = previsaoSlice.actions;

export default previsaoSlice.reducer;
