export interface PageProps<P, S = undefined> {
	params?: Promise<P>;
	searchParams?: Promise<S>;
}

export interface LayoutProps<P> {
	params?: Promise<P>;
	children: React.ReactNode;
}
