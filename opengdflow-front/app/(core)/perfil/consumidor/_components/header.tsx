"use client";
import Link from "next/link";
import type { FC } from "react";
import { ProfileSidebarTrigger } from "@/app/(core)/consumidores/[consumerId]/_components/profile-sidebar-trigger";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Consumer } from "@/lib/models/consumer";
import { cn } from "@/lib/utils";

export const Header: FC<{ consumer: Consumer }> = ({ consumer }) => {
	const consumerNameStyle = "text-muted-foreground font-normal";

	return (
		<header className="flex items-center gap-2 px-4 py-2 border border-b overflow-x-auto overflow-y-hidden justify-between">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="cursor-pointer" />
				<div className="h-4">
					<Separator orientation="vertical" />
				</div>
				<div className="flex gap-2 items-center">
					<Link
						href="/consumidores"
						className={cn(
							"text-sm leading-6 font-medium",
							consumer?.nome && consumerNameStyle,
						)}
					>
						Consumo
					</Link>
					{consumer?.nome && (
						<>
							<span className={cn("text-sm", consumerNameStyle)}>/</span>
							<span className="text-sm leading-6 font-medium">
								{consumer?.nome}
							</span>
						</>
					)}
				</div>
			</div>
			{consumer?.id && <ProfileSidebarTrigger className="cursor-pointer" />}
		</header>
	);
};
