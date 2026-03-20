import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Invoice } from "@/lib/models/invoices";

export interface InvoicesFilters {
	nomeConsumidor?: string | null;
	nomeUsina?: string | null;
	ucUsina?: string | null;
	ucConsumidor?: string | null;
	status?: string | null;
	referenciaInicial?: string | null; // format: YYYY-MM-DD
	referenciaFinal?: string | null; // format: YYYY-MM-DD
	vencimentoInicial?: string | null; // format: YYYY-MM-DD
	vencimentoFinal?: string | null; // format: YYYY-MM-DD
}

export interface InvoicesState {
	sheet: {
		open: boolean;
		data: Invoice | null;
	};
	visualization: "list" | "grid";
	filters: InvoicesFilters;
}

const initialState: InvoicesState = {
	sheet: {
		open: false,
		data: null,
	},
	visualization: "list",
	filters: {},
};

export const internalInvoiceSlice = createSlice({
	name: "invoice",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setVisualization: (state, { payload }: PayloadAction<"list" | "grid">) => {
			state.visualization = payload;
		},
		toggleOpenInvoiceSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setInvoiceData: (
			state,
			{ payload }: PayloadAction<Invoice | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanInvoiceData: (state) => {
			state.sheet.data = null;
		},
		setInvoicesFilters: (
			state,
			{ payload }: PayloadAction<InvoicesFilters | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.filters = initialState.filters;
			} else {
				state.filters = payload;
			}
		},
		clearInvoicesFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});

export const {
	toggleOpenInvoiceSheet,
	cleanInvoiceData,
	setInvoiceData,
	setInvoicesFilters,
	clearInvoicesFilters,
	setVisualization,
} = internalInvoiceSlice.actions;

export default internalInvoiceSlice.reducer;
