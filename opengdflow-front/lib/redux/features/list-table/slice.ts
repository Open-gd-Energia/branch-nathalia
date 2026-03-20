import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ListTableState {
	pagination: {
		itemsPerPage: number;
		currentPage: number;
		totalItems: number;
	};
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data?: any[] | null;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	filteredData?: any[] | null;
}

const initialState: ListTableState = {
	pagination: {
		itemsPerPage: 25,
		currentPage: 1,
		totalItems: 0,
	},
	data: null,
	filteredData: null,
};

export const listTableSlice = createSlice({
	name: "list-table",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		changePage: (state, payload: PayloadAction<number>) => {
			state.pagination.currentPage = payload.payload;
		},
		clearPagination: (state) => {
			state.pagination = initialState.pagination;
		},
		clearData: (state) => {
			state.data = null;
			state.filteredData = null;
		},
		setItemsPerPage: (state, payload: PayloadAction<number>) => {
			state.pagination.itemsPerPage = payload.payload;

			// calculate the current page
			const totalPages = Math.ceil(
				state.pagination.totalItems / state.pagination.itemsPerPage,
			);
			if (state.pagination.currentPage > totalPages)
				state.pagination.currentPage = totalPages;
			if (state.pagination.currentPage < 1) state.pagination.currentPage = 1;
		},
		setTotalItems: (state, payload: PayloadAction<number>) => {
			state.pagination.totalItems = payload.payload;
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		setData: (state, payload: PayloadAction<any[] | null>) => {
			state.data = payload.payload;

			const totalItems = payload.payload?.length ?? 0;
			state.pagination.totalItems = totalItems;
			const totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
			if (state.pagination.currentPage > totalPages)
				state.pagination.currentPage = totalPages;
			if (state.pagination.currentPage < 1) state.pagination.currentPage = 1;
		},
		setFilteredData: (
			state,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			payload: PayloadAction<any[] | null | undefined>,
		) => {
			state.filteredData = payload.payload;

			const totalItems = payload.payload?.length ?? 0;
			state.pagination.totalItems = totalItems;
			const totalPages = Math.ceil(totalItems / state.pagination.itemsPerPage);
			if (state.pagination.currentPage > totalPages)
				state.pagination.currentPage = totalPages;
			if (state.pagination.currentPage < 1) state.pagination.currentPage = 1;
		},
	},
});

export const {
	changePage,
	clearPagination,
	setItemsPerPage,
	setTotalItems,
	setData,
	setFilteredData,
	clearData,
} = listTableSlice.actions;

export default listTableSlice.reducer;
