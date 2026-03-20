"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";

// Create a client
const queryClient = new QueryClient();

export interface ProvidersProps extends PropsWithChildren {
	session: Session | null;
}

export const Providers: FC<ProvidersProps> = ({ children, session }) => {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</Provider>
		</SessionProvider>
	);
};
