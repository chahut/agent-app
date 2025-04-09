import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

/**
 * Layout of the mainframe + sidebar, included for every app route
 * @category Route
 */
export default function Index() {
	return (
		<SidebarProvider>
            <div className="bg-amber-300">dlskqjdslq</div>
			<Sidebar>
				<SidebarHeader />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>History</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{["convo", "chat 2"].map((item) => (
									<SidebarMenuItem key={item}>
										<SidebarMenuButton asChild>
											<span className="">{item}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
					<SidebarGroup />
				</SidebarContent>
				<SidebarFooter />
			</Sidebar>
			<main>
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
