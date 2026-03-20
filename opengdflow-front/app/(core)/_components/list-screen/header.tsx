import type { FC, PropsWithChildren } from "react";

export const ListScreenHeader: FC<PropsWithChildren> = ({ children }) => {
	return (
		<header>
			<div className="flex justify-between px-4 py-2 border border-t-0 gap-4 overflow-y-auto">
				{children}
			</div>
		</header>
	);
};
