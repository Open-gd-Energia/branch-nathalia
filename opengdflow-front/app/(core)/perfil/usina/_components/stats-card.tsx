import type { FC, PropsWithChildren } from "react";

export const StatsCard: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col gap-[2px] rounded-md bg-muted p-3 w-full max-w-64 min-w-40">
			{children}
		</div>
	);
};
