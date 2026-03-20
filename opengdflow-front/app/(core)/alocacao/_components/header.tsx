import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
	return (
		<header className="flex items-center justify-between px-4 py-2 border border-b overflow-x-auto overflow-y-hidden">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="cursor-pointer" />
				<div className="h-4">
					<Separator orientation="vertical" />
				</div>
				<span className="text-sm leading-6 font-medium">Alocação</span>
			</div>
		</header>
	);
};
