import type { FC, PropsWithChildren } from "react";

const Card: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col gap-3 rounded-lg bg-muted min-h-[107px] p-5 w-full max-w-56 border border-[#E4E4E7]">
			{children}
		</div>
	);
};

const Header: FC<PropsWithChildren> = ({ children }) => {
	return (
		<h3 className="text-xs leading-4 font-medium text-muted-foreground">
			{children}
		</h3>
	);
};

const Body: FC<PropsWithChildren> = ({ children }) => {
	return <div className="flex gap-2 items-center">{children}</div>;
};

const Info: FC<PropsWithChildren> = ({ children }) => {
	return (
		<span className="text-xl text-foreground font-semibold">{children}</span>
	);
};

const Icon: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="rounded-full bg-background size-10 border border-[#E4E4E7] flex items-center justify-center [&>svg]:text-muted-foreground [&>svg]:size-5">
			{children}
		</div>
	);
};

export const StatsCard = { Card, Header, Body, Info, Icon } as const;
