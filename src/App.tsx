import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { chahutApi } from "@chahut/api";
import useAgent from "./modules/agent/hooks/useAgent";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "./components/ui/sidebar";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");
	const [answer, setAnswer] = useState("");

	const { ask } = useAgent({ id: "mistral-public" });

	async function greet() {
		console.info("HELLO");

		setAnswer(
			(a) => `${a}
    `,
		);

		ask(name, (chunk) => setAnswer((a) => `${a}${chunk}`));
	}

	return (
		<SidebarProvider>
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
											<span>{item}</span>
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
			<main className="w-full h-[100vh] flex flex-col">
				<SidebarTrigger />
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel className="p-3 relative">
						<div className="w-full grow flex h-full">
							<p className="grow">{answer}</p>
							<div className="absolute bottom-0 right-0 p-3 self-center w-full flex justify-end">
								<Button onClick={greet}>Send</Button>
							</div>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle>Hello</ResizableHandle>
					<ResizablePanel className="p-3">
						<form
							className="flex flex-row gap-3 h-full"
							onSubmit={(e) => {
								e.preventDefault();
								console.log(e);

								greet();
							}}
						>
							<Textarea
								id="greet-input"
								className="resize-none h-full"
								onChange={(e) => setName(e.currentTarget.value)}
								placeholder="Enter a name..."
							/>
						</form>
					</ResizablePanel>
				</ResizablePanelGroup>
			</main>
		</SidebarProvider>
	);
}

export default App;
