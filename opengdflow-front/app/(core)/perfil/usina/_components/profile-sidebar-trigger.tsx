"use client";
import { PanelLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { toggleCoreLayoutSidebar } from "@/lib/redux/features/globals/slice";
import { cn } from "@/lib/utils";

export const ProfileSidebarTrigger = ({
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) => {
	const dispatch = useAppDispatch();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(e);
		dispatch(toggleCoreLayoutSidebar());
	};

	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon"
			className={cn("size-7", className)}
			onClick={handleClick}
			{...props}
		>
			<PanelLeftIcon />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
};
