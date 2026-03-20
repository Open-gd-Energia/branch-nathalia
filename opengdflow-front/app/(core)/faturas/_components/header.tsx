"use client";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setVisualization } from "@/lib/redux/features/invoices/slice";

export const Header = () => {
	const dispatch = useAppDispatch();
	const visualization = useAppSelector((state) => state.invoices.visualization);

	return (
		<header className="flex items-center justify-between px-4 py-2 border border-b overflow-x-auto overflow-y-hidden">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="cursor-pointer" />
				<div className="h-4">
					<Separator orientation="vertical" />
				</div>
				<span className="text-sm leading-6 font-medium">Faturas</span>
			</div>
			<div className="flex items-center gap-1">
				<Button
					variant={visualization === "list" ? "secondary" : "outline"}
					size="icon"
					className="size-7"
					onClick={() => dispatch(setVisualization("list"))}
				>
					<List size={16} />
				</Button>
				<Button
					variant={visualization === "grid" ? "secondary" : "outline"}
					size="icon"
					className="size-7"
					onClick={() => dispatch(setVisualization("grid"))}
				>
					<Grid size={16} />
				</Button>
			</div>
		</header>
	);
};
