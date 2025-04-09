import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import {
	MarkdownStreamParser,
	MarkdownStreamParserOptions,
	createMarkdownStreamParser,
} from "@nlux/markdown";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { chahutApi } from "@chahut/api";
import useAgent from "./modules/agent/hooks/useAgent";
import { Button } from "./components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./components/ui/select";
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
import { ScrollArea } from "@radix-ui/react-scroll-area";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");
	const answerRef = useRef<HTMLDivElement>(null);
	const [mdStreamParser, setMdStreamParser] =
		useState<MarkdownStreamParser | null>(null);

	useEffect(() => {
		if (!answerRef.current) return;

		const options: MarkdownStreamParserOptions = {
			// markdownLinkTarget?: 'blank' | 'self';                       // default: 'blank'
			// syntaxHighlighter: (( Highlighter from @nlux/highlighter )), // default: undefined — for code blocks syntax highlighting
			// showCodeBlockCopyButton?: boolean,                           // default: true — for code blocks
			// skipStreamingAnimation?: boolean,                            // default: false
			// streamingAnimationSpeed?: number,                            // default: 10 ( milliseconds )
			// waitTimeBeforeStreamCompletion?: number | 'never',           // default: 2000 ( milliseconds )
			// onComplete: () => console.log("Parsing complete"),           // triggered after the end of the stream
		};

		const domElement = answerRef.current;

		setMdStreamParser(mdStreamParser);
	}, [answerRef]);

	const { ask } = useAgent({ id: "mistral-public" });

	async function greet() {
		console.info("HELLO");

		if (!answerRef.current) return;

		const domElement = answerRef.current;

		const mdStreamParser: MarkdownStreamParser = createMarkdownStreamParser(
			domElement!,
			{},
		);

		mdStreamParser.next("## Hello World");

		await ask(name, (chunk) => mdStreamParser.next(chunk));

		console.log("a");
		mdStreamParser.complete();
	}

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader />
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>History</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu >
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
			<main className="w-full h-[100vh] flex flex-col relative">
				<SidebarTrigger className="absolute" />
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel className="py-0 pl-3 relative">
						<div className="w-full grow flex h-full max-h-full">
							<ScrollArea
								className="mx-auto max-w-[600px] grow overflow-y-scroll"
								ref={answerRef}
							></ScrollArea>
						</div>
					</ResizablePanel>
					<ResizablePanel className="relative bg-stone-100">
						{/* <div className="absolute bottom-0 right-0 p-6 self-center w-full flex justify-end">
							<Button onClick={greet}>Send</Button>
						</div> */}
						<div className="p-3 w-full flex justify-between mx-auto max-w-[600px]">
							<Select size="sm">
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Speak to" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Mistral</SelectItem>
								</SelectContent>
							</Select>
							<div className="flex flex-col justify-center gap-2 items-center h-full">
								<ResizableHandle withHandle>Hello</ResizableHandle>
							</div>

							<Button onClick={greet}>Send</Button>
						</div>
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
								className="resize-none h-full bg-transparent rounded-none"
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
