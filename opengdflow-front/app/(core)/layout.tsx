import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar";

export default function CoreLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full w-full">
			<SidebarProvider
				style={
					{
						"--sidebar-width": "14rem",
						height: "100%",
					} as React.CSSProperties
				}
			>
				<AppSidebar />
				{children}
			</SidebarProvider>
		</div>
	);
}
