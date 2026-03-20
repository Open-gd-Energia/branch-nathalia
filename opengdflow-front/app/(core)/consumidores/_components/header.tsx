"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { fetchConsumerById } from "../_services/fetch-by-id";
import { ProfileSidebarTrigger } from "../[consumerId]/_components/profile-sidebar-trigger";

export const Header = () => {
	const params = useParams();
	const { data: consumer } = useQuery({
		queryKey: ["consumer", params?.consumerId],
		queryFn: () => fetchConsumerById((params?.consumerId as string) || ""),
	});

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
			{params?.consumerId && (
				<ProfileSidebarTrigger className="cursor-pointer" />
			)}
		</header>
	);
};
