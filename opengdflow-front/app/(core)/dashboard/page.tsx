"use client";

import { useSession } from "next-auth/react";
import { EnergyChart } from "./_components/energy-chart";
import { FaturasSection } from "./_components/faturas-section";
import { InfoCards } from "./_components/infor-cards";

export default function DashboardPage() {
	const { data } = useSession();
	return (
		<div className="flex flex-col h-full w-full px-8 overflow-auto pb-8">
			<header className="py-5">
				<h2 className="text-lg leading-7 font-semibold capitalize py-1.5">
					Olá, {data?.user?.name?.toLocaleLowerCase()}
				</h2>
			</header>
			<section className="flex flex-col gap-4">
				<h2 className="leading-7 font-semibold">Resumo Geral</h2>

				<InfoCards />
			</section>
			<section className="flex w-full gap-2 my-6">
				<EnergyChart />
			</section>

			<FaturasSection />
		</div>
	);
}
