import { configureStore } from "@reduxjs/toolkit";
import accessProfilesReducer from "./features/access-profiles/slice";
import alocacaoReducer from "./features/alocacao/slice";
import billingTypeReducer from "./features/billing-type/slice";
import citiesSelectReducer from "./features/cities-select/slice";
import cobrancasReducer from "./features/cobrancas/slice";
import consumersReducer from "./features/consumers/slice";
import contactReducer from "./features/contact/slice";
import disctounTypesReducer from "./features/discount-types/slice";
import distribuitorsReducer from "./features/distribuitors/slice";
import faturaViewSheetReducer from "./features/fatura-view/slice";
import formWrapperReducer from "./features/form-wrapper-slice";
import geracaoReducer from "./features/geracao/slice";
import globalsReducer from "./features/globals/slice";
import internalUserReducer from "./features/internal-user/slice";
import invoicesReducer from "./features/invoices/slice";
import listTableReducer from "./features/list-table/slice";
import previsaoReducer from "./features/previsao/slice";
import tariffRulesReducer from "./features/tariff-rules/slice";
import usinasReducer from "./features/usinas/slice";

export const store = configureStore({
	reducer: {
		accessProfiles: accessProfilesReducer,
		billingType: billingTypeReducer,
		tariffRules: tariffRulesReducer,
		distribuitors: distribuitorsReducer,
		citiesSelect: citiesSelectReducer,
		listTable: listTableReducer,
		discountTypes: disctounTypesReducer,
		internalUser: internalUserReducer,
		contact: contactReducer,
		invoices: invoicesReducer,
		consumers: consumersReducer,
		globals: globalsReducer,
		cobrancas: cobrancasReducer,
		alocacao: alocacaoReducer,
		usinas: usinasReducer,
		geracao: geracaoReducer,
		previsao: previsaoReducer,
		faturaViewSheet: faturaViewSheetReducer,
		formWrapper: formWrapperReducer,
	},
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
