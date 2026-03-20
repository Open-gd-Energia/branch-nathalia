import { Header } from "./_components/header";

export default function PeopleLayout({
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
