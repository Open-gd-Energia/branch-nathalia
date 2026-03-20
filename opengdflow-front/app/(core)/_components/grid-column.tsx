import type { FC, PropsWithChildren } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ColumnProps extends PropsWithChildren {
	title: string;
	amount: number;
}

export const GridColumn: FC<ColumnProps> = ({ children, title, amount }) => {
	return (
		<div className="flex flex-col h-full bg-muted rounded-md p-2 gap-2 overflow-hidden">
			<header className="h-7 flex items-center gap-2 justify-between p-1">
				<Badge>{title}</Badge>
				<span className="text-xs leading-4 text-muted-foreground">
					{amount}
				</span>
			</header>

			<ScrollArea className="flex-1 overflow-auto">
				<div className="space-y-1">{children}</div>
			</ScrollArea>
		</div>
	);
};
