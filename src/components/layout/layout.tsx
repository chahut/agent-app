import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export type LayoutProps = {
	sidebar: ReactNode;
	children: ReactNode;
};

export default function Layout({ sidebar, children }: LayoutProps) {
	return (
		<SidebarProvider>
			{sidebar}
			<main className="flex-1 overflow-hidden">{children}</main>
		</SidebarProvider>
	);
}
