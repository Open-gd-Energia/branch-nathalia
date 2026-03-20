"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const routes = [
	{
		label: "Distribuidoras",
		value: "/config/distribuidoras",
	},
	{
		label: "Regras tarifárias",
		value: "/config/regras-tarifarias",
	},
	{
		label: "Tipos de desconto",
		value: "/config/tipos-desconto",
	},
	{
		label: "Tipos de faturamento",
		value: "/config/tipo-faturamento",
	},
	{
		label: "Perfis de acesso",
		value: "/config/perfis-acesso",
	},
];

export const Header = () => {
	const pathname = usePathname();

	return (
		<header>
			<div className="flex items-center gap-2 px-4 py-2 border border-b overflow-x-auto overflow-y-hidden">
				<SidebarTrigger className="cursor-pointer" />
				<div className="h-4">
					<Separator orientation="vertical" />
				</div>
				<span className="text-sm leading-6 font-medium">Configurações</span>
				<Tabs value={pathname}>
					<TabsList>
						{routes.map((route) => (
							<Link key={route.value} href={route.value}>
								<TabsTrigger key={route.value} value={route.value}>
									{route.label}
								</TabsTrigger>
							</Link>
						))}
					</TabsList>
				</Tabs>
			</div>
		</header>
	);
};
