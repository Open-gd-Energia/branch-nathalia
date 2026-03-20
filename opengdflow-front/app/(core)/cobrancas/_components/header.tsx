"use client";
import { Grid, List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setCobrancaPagarVisualization } from "@/lib/redux/features/cobrancas/slice";

const routes = [
	{
		label: "A pagar",
		value: "/cobrancas/pagar",
	},
	{
		label: "A receber",
		value: "/cobrancas/receber",
	},
];

export const Header = () => {
	const dispatch = useAppDispatch();
	const visualization = useAppSelector(
		(state) => state.cobrancas.visualization,
	);
	const pathname = usePathname();

	return (
		<header className="flex items-center justify-between px-4 py-2 border border-b overflow-x-auto overflow-y-hidden">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="cursor-pointer" />
				<div className="h-4">
					<Separator orientation="vertical" />
				</div>
				<span className="text-sm leading-6 font-medium">Cobranças</span>

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
			<div className="flex items-center gap-1">
				<Button
					variant={visualization === "list" ? "secondary" : "outline"}
					size="icon"
					className="size-7"
					onClick={() => dispatch(setCobrancaPagarVisualization("list"))}
				>
					<List size={16} />
				</Button>
				<Button
					variant={visualization === "grid" ? "secondary" : "outline"}
					size="icon"
					className="size-7"
					onClick={() => dispatch(setCobrancaPagarVisualization("grid"))}
				>
					<Grid size={16} />
				</Button>
			</div>
		</header>
	);
};
