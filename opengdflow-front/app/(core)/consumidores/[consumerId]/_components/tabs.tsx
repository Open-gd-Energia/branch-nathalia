"use client";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ConsumerContentTabs = () => {
	const router = useRouter();
	const pathname = usePathname();
	const lastPath = useMemo(() => pathname.split("/").pop(), [pathname]);

	const tabs = [
		{
			label: "Alocação",
			value: "alocacao",
		},
		{
			label: "Consumo",
			value: "consumo",
		},
		{
			label: "Faturas",
			value: "faturas",
		},
		{
			label: "Cobranças",
			value: "cobrancas",
		},
		{
			label: "Documentos",
			value: "documentos",
		},
	];

	const handleValueChange = (value: string) => {
		router.push(`${pathname.replace(lastPath ?? "", value)}`);
	};

	return (
		<div className="flex w-full overflow-auto">
			<Tabs
				value={lastPath ?? tabs[0].value}
				onValueChange={handleValueChange}
				className="w-[400px]"
			>
				<TabsList>
					{tabs.map((tab) => (
						<TabsTrigger key={tab.value} value={tab.value}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</div>
	);
};
