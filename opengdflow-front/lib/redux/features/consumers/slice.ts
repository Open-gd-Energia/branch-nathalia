import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Consumer } from "@/lib/models/consumer";

export interface ConsumersFilters {
	nome?: string | null;
	uc?: string | null;
	idDistribuidora?: string | number | null;
	status?: string | null;
}

export interface ConsumersState {
	sheet: {
		open: boolean;
		data: Consumer | null;
	};
	filters: ConsumersFilters;
}

const initialState: ConsumersState = {
	sheet: {
		open: false,
		data: null,
	},
	filters: {},
};

export const ConsumersSlice = createSlice({
	name: "consumers",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenConsumerSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setConsumerData: (
			state,
			{ payload }: PayloadAction<Consumer | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanConsumerData: (state) => {
			state.sheet.data = null;
		},
		setConsumersFilters: (
			state,
			{ payload }: PayloadAction<ConsumersFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.filters = initialState.filters;
			} else {
				state.filters = payload;
			}
		},
		clearConsumersFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	toggleOpenConsumerSheet,
	cleanConsumerData,
	setConsumerData,
	setConsumersFilters,
	clearConsumersFilters,
} = ConsumersSlice.actions;

export default ConsumersSlice.reducer;
