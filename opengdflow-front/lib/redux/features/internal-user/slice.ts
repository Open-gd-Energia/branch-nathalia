import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/lib/models/user";

export interface InternalUserState {
	sheet: {
		open: boolean;
		data: User | null;
	};
}

const initialState: InternalUserState = {
	sheet: {
		open: false,
		data: null,
	},
};

export const internalUserSlice = createSlice({
	name: "internal-user",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenInternalUserSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setInternalUserData: (
			state,
			{ payload }: PayloadAction<User | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanInternalUserData: (state) => {
			state.sheet.data = null;
		},
	},
});

export const {
	toggleOpenInternalUserSheet,
	cleanInternalUserData,
	setInternalUserData,
} = internalUserSlice.actions;

export default internalUserSlice.reducer;
