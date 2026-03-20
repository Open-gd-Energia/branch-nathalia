"use client";

import { ChevronsUpDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const UserSidebar = () => {
	const { data } = useSession();
	const { open } = useSidebar();

	const getFirst2Initials = useCallback((name: string) => {
		const names = name.split(" ");
		let initials = `${names?.[0]?.charAt(0)}`;
		if (names?.[1]?.charAt(0)) initials += `${names?.[1]?.charAt(0)}`;
		return initials.toUpperCase();
	}, []);

	const handleSignOut = async () => {
		// optional: clear custom localStorage/sessionStorage
		localStorage.clear();
		sessionStorage.clear();

		await signOut({ redirect: true, callbackUrl: "/auth/signin" });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						"transition-all duration-300 flex gap-2 cursor-pointer w-full items-center justify-between hover:bg-sidebar-accent rounded-lg",
						open && "p-2 ",
					)}
				>
					<Avatar>
						<AvatarFallback>
							{getFirst2Initials(data?.user?.name || "")}
						</AvatarFallback>
					</Avatar>
					<div
						className={cn(
							"flex flex-col gap-0.5 flex-1 text-sidebar-foreground overflow-hidden",
							open
								? "opacity-100 max-h-20 transition-all duration-700 ease-in-out"
								: "opacity-0 max-h-0",
						)}
					>
						<span className="text-sm leading-none font-semibold">
							{data?.user?.name}
						</span>
						<span className="text-xs leading-4">{data?.user?.email}</span>
					</div>
					<ChevronsUpDown size={16} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="top" align="start">
				<DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
