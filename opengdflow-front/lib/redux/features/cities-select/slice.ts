import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBGECity, IBGEUF } from "@/lib/models/ibge";

export interface CitiesSelectState {
	currentState?: IBGEUF | null;
	cities?: IBGECity[] | null;
}

const initialState: CitiesSelectState = {
	currentState: null,
	cities: null,
};

export const citiesSelectSlice = createSlice({
	name: "cities-select",
	initialState,
	reducers: {
		setCurrentState: (
			state,
			{ payload }: PayloadAction<IBGEUF | null | undefined>,
		) => {
			state.currentState = payload ?? null;
		},
		setCities: (
			state,
			{ payload }: PayloadAction<IBGECity[] | null | undefined>,
		) => {
			state.cities = payload ?? null;
		},
	},
});

export const { setCurrentState, setCities } = citiesSelectSlice.actions;

export default citiesSelectSlice.reducer;
