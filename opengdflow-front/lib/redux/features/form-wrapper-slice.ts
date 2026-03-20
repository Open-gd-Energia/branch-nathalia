import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FormWrapperState {
	activeSection?: string;
}

const initialState: FormWrapperState = {
	activeSection: undefined,
};

export const formWrapperSlice = createSlice({
	name: "form-wrapper",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setFormWrapperActiveSection: (state, action: PayloadAction<string>) => {
			state.activeSection = action.payload;
		},
		cleanActiveSection: (state) => {
			state.activeSection = undefined;
		},
	},
});

export const { setFormWrapperActiveSection, cleanActiveSection } =
	formWrapperSlice.actions;

export default formWrapperSlice.reducer;
