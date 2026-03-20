import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Distribuitors } from "@/lib/models/distribuidora";

export interface DistribuitorsState {
	sheet: {
		open: boolean;
		data: Distribuitors | null;
	};
}

const initialState: DistribuitorsState = {
	sheet: {
		open: false,
		data: null,
	},
};

export const distribuitorsSlice = createSlice({
	name: "distribuitors",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenDistribuitorsSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setDistribuitorsData: (
			state,
			{ payload }: PayloadAction<Distribuitors | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanDistribuitorsData: (state) => {
			state.sheet.data = null;
		},
	},
});

export const {
	toggleOpenDistribuitorsSheet,
	cleanDistribuitorsData,
	setDistribuitorsData,
} = distribuitorsSlice.actions;

export default distribuitorsSlice.reducer;
