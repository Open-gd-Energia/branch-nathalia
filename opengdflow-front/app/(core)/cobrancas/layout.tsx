import { Header } from "./_components/header";

export default function CobrancasLayout({
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
