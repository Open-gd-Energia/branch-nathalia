import type { FC, PropsWithChildren } from "react";

export const ListLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<section className="grid grid-rows-[auto_1fr_auto] h-[calc(100%-48px)]">
			{children}
		</section>
	);
};
