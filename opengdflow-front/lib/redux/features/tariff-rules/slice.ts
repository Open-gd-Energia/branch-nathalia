import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TariffRules } from "@/lib/models/tariff-rules";

export interface TariffRulesState {
	sheet: {
		open: boolean;
		data: TariffRules | null;
	};
}

const initialState: TariffRulesState = {
	sheet: {
		open: false,
		data: null,
	},
};

export const tariffRulesSlice = createSlice({
	name: "tariff-rules",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenTariffRulesSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setTariffRulesData: (
			state,
			{ payload }: PayloadAction<TariffRules | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanTariffRulesData: (state) => {
			state.sheet.data = null;
		},
	},
});

export const {
	toggleOpenTariffRulesSheet,
	cleanTariffRulesData,
	setTariffRulesData,
} = tariffRulesSlice.actions;

export default tariffRulesSlice.reducer;
