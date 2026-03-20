import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BillingType } from "@/lib/models/billing-type";

export interface BillingTypeFilters {
	referencia?: string;
}

export interface BillingTypeState {
	sheet: {
		open: boolean;
		data: BillingType | null;
	};
	filters: BillingTypeFilters;
}

const initialState: BillingTypeState = {
	sheet: {
		open: false,
		data: null,
	},
	filters: {
		referencia: "",
	},
};

export const billingTypeSlice = createSlice({
	name: "billing-type",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenBillingTypeSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setBillingTypeData: (
			state,
			{ payload }: PayloadAction<BillingType | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanBillingTypeData: (state) => {
			state.sheet.data = null;
		},
		setBillingTypeFilters: (
			state,
			{ payload }: PayloadAction<BillingTypeFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.filters = initialState.filters;
			} else {
				state.filters = payload;
			}
		},
		clearBillingTypeFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	toggleOpenBillingTypeSheet,
	cleanBillingTypeData,
	setBillingTypeData,
	setBillingTypeFilters,
	clearBillingTypeFilters,
} = billingTypeSlice.actions;

export default billingTypeSlice.reducer;
