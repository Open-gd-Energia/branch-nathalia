import { Header } from "./_components/header";

export default function EasyCrudsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="w-full h-full overflow-hidden">
			<Header />
			{children}
		</main>
	);
}
