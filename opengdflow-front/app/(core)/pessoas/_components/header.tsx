"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const routes = [
	{
		label: "Contatos",
		value: "/pessoas/contatos",
	},
	{
		label: "Usuários",
		value: "/pessoas/usuarios",
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
				<span className="text-sm leading-6 font-medium">Pessoas</span>
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
