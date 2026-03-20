import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Invoice } from "@/lib/models/invoices";

export interface FaturaViewSheet {
	open: boolean;
	data: Invoice | null;
}

const initialState: FaturaViewSheet = {
	open: false,
	data: null,
};

export const faturaViewSheetSlice = createSlice({
	name: "fatura-view-sheet",
	initialState,
	reducers: {
		toggleOpenFaturaViewSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.open = !state.open;
			} else {
				state.open = payload;
			}
		},
		setFaturaViewData: (
			state,
			{ payload }: PayloadAction<Invoice | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.data = null;
			} else {
				state.data = payload;
			}
		},
		cleanFaturaViewData: (state) => {
			state.data = null;
		},
	},
});

export const {
	toggleOpenFaturaViewSheet,
	cleanFaturaViewData,
	setFaturaViewData,
} = faturaViewSheetSlice.actions;

export default faturaViewSheetSlice.reducer;
