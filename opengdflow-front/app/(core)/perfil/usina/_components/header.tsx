"use client";
import type { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Usina } from "@/lib/models/usina";
import { cn } from "@/lib/utils";
import { ProfileSidebarTrigger } from "./profile-sidebar-trigger";

export const Header: FC<{ usina: Usina }> = ({ usina }) => {
	const usinaNameStyle = "text-muted-foreground font-normal";

	return (
		<header className="flex items-center gap-2 px-4 py-2 border border-b overflow-x-auto overflow-y-hidden justify-between">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="cursor-pointer" />
				<div className="h-4">
					<Separator orientation="vertical" />
				</div>
				<div className="flex gap-2 items-center">
					<span
						className={cn(
							"text-sm leading-6 font-medium",
							usina?.nome && usinaNameStyle,
						)}
					>
						Geração
					</span>
					{usina?.nome && (
						<>
							<span className={cn("text-sm", usinaNameStyle)}>/</span>
							<span className="text-sm leading-6 font-medium">
								{usina?.nome}
							</span>
						</>
					)}
				</div>
			</div>
			{usina?.id && <ProfileSidebarTrigger className="cursor-pointer" />}
		</header>
	);
};
