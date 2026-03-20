import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface GlobalsState {
	coreLayoutSidebarOpen: boolean;
}

const initialState: GlobalsState = {
	coreLayoutSidebarOpen: true,
};

export const globalsSlice = createSlice({
	name: "globals",
	initialState,
	reducers: {
		toggleCoreLayoutSidebar: (
			state,
			action: PayloadAction<boolean | undefined>,
		) => {
			if (typeof action.payload === "boolean") {
				state.coreLayoutSidebarOpen = action.payload;
				return;
			}
			state.coreLayoutSidebarOpen = !state.coreLayoutSidebarOpen;
		},
	},
});

export const { toggleCoreLayoutSidebar } = globalsSlice.actions;

export default globalsSlice.reducer;
