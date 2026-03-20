import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Usina } from "@/lib/models/usina";

export interface UsinasFilters {
	nome?: string | null;
	uc?: string | null;
	status?: string | null;
	calcCotaAlocada?: "true" | "false";
}

export interface UsinasState {
	sheet: {
		open: boolean;
		data: Usina | null;
	};
	filters: UsinasFilters;
}

const initialState: UsinasState = {
	sheet: {
		open: false,
		data: null,
	},
	filters: {},
};

export const UsinasSlice = createSlice({
	name: "usinas",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenUsinaSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setUsinaData: (
			state,
			{ payload }: PayloadAction<Usina | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanUsinaData: (state) => {
			state.sheet.data = null;
		},
		setUsinaFilters: (
			state,
			{ payload }: PayloadAction<UsinasFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.filters = initialState.filters;
			} else {
				state.filters = payload;
			}
		},
		clearUsinaFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	cleanUsinaData,
	clearUsinaFilters,
	setUsinaData,
	setUsinaFilters,
	toggleOpenUsinaSheet,
} = UsinasSlice.actions;

export default UsinasSlice.reducer;
