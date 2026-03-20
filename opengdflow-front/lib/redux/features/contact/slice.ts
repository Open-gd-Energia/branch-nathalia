import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "@/lib/models/contact";

export interface ContactState {
	sheet: {
		open: boolean;
		data: Contact | null;
	};
}

const initialState: ContactState = {
	sheet: {
		open: false,
		data: null,
	},
};

export const contactSlice = createSlice({
	name: "contact",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		toggleOpenContactSheet: (
			state,
			{ payload }: PayloadAction<boolean | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.open = !state.sheet.open;
			} else {
				state.sheet.open = payload;
			}
		},
		setContactData: (
			state,
			{ payload }: PayloadAction<Contact | null | undefined>,
		) => {
			if (payload == null || payload === undefined) {
				state.sheet.data = null;
			} else {
				state.sheet.data = payload;
			}
		},
		cleanContactData: (state) => {
			state.sheet.data = null;
		},
	},
});

export const { toggleOpenContactSheet, cleanContactData, setContactData } =
	contactSlice.actions;

export default contactSlice.reducer;
