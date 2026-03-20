"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { fetchUsinaById } from "../_services/fetch-by-id";
import { ProfileSidebarTrigger } from "../[usinaId]/_components/profile-sidebar-trigger";

export const Header = () => {
	const params = useParams();
	const { data: usinas } = useQuery({
		queryKey: ["usinas", params?.usinaId],
		queryFn: () => fetchUsinaById((params?.usinaId as string) || ""),
	});

	const usinaNameStyle = "text-muted-foreground font-normal";

	return (
		<header className="flex items-center gap-2 px-4 py-2 border border-b overflow-x-auto overflow-y-hidden justify-between">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="cursor-pointer" />
				<div className="h-4">
					<Separator orientation="vertical" />
				</div>
				<div className="flex gap-2 items-center">
					<Link
						href="/usinas"
						className={cn(
							"text-sm leading-6 font-medium",
							usinas?.nome && usinaNameStyle,
						)}
					>
						Geração
					</Link>
					{usinas?.nome && (
						<>
							<span className={cn("text-sm", usinaNameStyle)}>/</span>
							<span className="text-sm leading-6 font-medium">
								{usinas?.nome}
							</span>
						</>
					)}
				</div>
			</div>
			{params?.usinaId && <ProfileSidebarTrigger className="cursor-pointer" />}
		</header>
	);
};
