"use client";
import {
	LayoutDashboard,
	Lightbulb,
	ReceiptText,
	Settings2,
	Tickets,
	User,
	Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { pathMatchesPattern, protectedRoutesMap } from "@/lib/routes-mapping";
import { cn } from "@/lib/utils";
import { UserSidebar } from "./user-sidebar";

export const AppSidebar = () => {
	const { open } = useSidebar();
	const { data } = useSession();

	const referenceRoutes = useMemo(() => {
		if (data?.user?.scope?.includes("ADMIN")) {
			return Object.values(protectedRoutesMap).flat().flat();
		}
		const userScopesRoutes = Object.entries(protectedRoutesMap).reduce<
			Record<string, string[]>
		>((acc, [scope, routes]) => {
			if (!data?.user?.scope.includes(scope)) return acc;
			acc[scope] = routes;
			return acc;
		}, {});

		const routes = Object.values(userScopesRoutes).flat();
		return routes;
	}, [protectedRoutesMap]);

	const dadosSidebarGroups = [
		{
			items: [{ href: "/perfil", label: "Home", icon: LayoutDashboard }],
		},
	];

	const sidebarGroups = [
		{
			items: [
				{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
				// { href: "/notifications", label: "Notificações", icon: Bell },
				{
					href: "/config/distribuidoras",
					label: "Configurações",
					icon: Settings2,
				},
			],
		},
		{
			items: [
				{ href: "/usinas", label: "Geração", icon: Zap },
				{ href: "/consumidores", label: "Consumo", icon: Lightbulb },
				{ href: "/alocacao", label: "Alocação", icon: ReceiptText },
				{ href: "/faturas", label: "Faturas", icon: Settings2 },
			],
		},
		{
			items: [
				{ href: "/cobrancas", label: "Cobranças", icon: Tickets },
				{ href: "/pessoas", label: "Pessoas", icon: User },
			],
		},
	];

	const matchesRoute = (href: string) =>
		referenceRoutes.some((pattern) => {
			return pathMatchesPattern(href, pattern);
		});

	const getUserGroupsAccess = useCallback(() => {
		if (data?.user?.scope?.includes("DADOS")) {
			return [...dadosSidebarGroups];
		}
		const groups = sidebarGroups.map((group) => ({
			items: group.items.filter(({ href }) => matchesRoute(href)),
		}));
		return groups.filter((group) => group.items.length > 0);
	}, [sidebarGroups, referenceRoutes]);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Image
					className={cn(
						"max-h-8",
						open && "m-2 transition-all duration-300 ease-in-out",
					)}
					alt="OpenGD"
					src={open ? "/green-logo.svg" : "/green-logo-sm.svg"}
					width={104}
					height={24}
				/>
			</SidebarHeader>
			<SidebarContent>
				{getUserGroupsAccess().map((group, index) => (
					<SidebarGroup key={index}>
						<SidebarGroupContent>
							<SidebarMenu>
								{group?.items?.map(({ icon: Icon, label, href }) => (
									<SidebarMenuItem key={href}>
										<SidebarMenuButton asChild>
											<Link className="text-sidebar-foreground" href={href}>
												<Icon size={16} />
												<span>{label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<UserSidebar />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
