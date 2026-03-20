import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AccessProfile } from "@/lib/models/access-profiles";

export interface AccessProfileState {
	sheet: {
		open: boolean;
		data: AccessProfile | null;
	};
}

const initialState: AccessProfileState = {
	sheet: {
		open: false,
		data: null,
	},
};

export const accessProfilesSlice = createSlice({
	name: "access-profiles",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenAccessProfilesSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setAccessProfilesData: (
			state,
			{ payload }: PayloadAction<AccessProfile | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanAccessProfilesData: (state) => {
			state.sheet.data = null;
		},
	},
});

export const {
	cleanAccessProfilesData,
	setAccessProfilesData,
	toggleOpenAccessProfilesSheet,
} = accessProfilesSlice.actions;

export default accessProfilesSlice.reducer;
