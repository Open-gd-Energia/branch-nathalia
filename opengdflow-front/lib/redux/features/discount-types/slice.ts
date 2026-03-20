import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DiscountTypes } from "@/lib/models/discount-types";

export interface DiscountTypesState {
	sheet: {
		open: boolean;
		data: DiscountTypes | null;
	};
}

const initialState: DiscountTypesState = {
	sheet: {
		open: false,
		data: null,
	},
};

export const discountTypesSlice = createSlice({
	name: "discount-types",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenDiscountTypesSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setDiscountTypesData: (
			state,
			{ payload }: PayloadAction<DiscountTypes | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanDiscountTypesData: (state) => {
			state.sheet.data = null;
		},
	},
});

export const {
	toggleOpenDiscountTypesSheet,
	cleanDiscountTypesData,
	setDiscountTypesData,
} = discountTypesSlice.actions;

export default discountTypesSlice.reducer;
