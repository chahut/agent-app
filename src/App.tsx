import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import { chahutApi } from "@chahut/api";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");
	const [answer, setAnswer] = useState("");

	async function greet() {
		console.info("HELLO");

		setAnswer(
			(a) => `${a}
    `,
		);

		const api = chahutApi("https://api-production-8d81.up.railway.app/");
		const answer = await api
			.agent({ id: "mistral-public" })
			.ask.get({ query: { prompt: name } });

		if (!answer.data) return;

		for await (const chunk of answer.data) {
			setAnswer((a) => `${a}${chunk}`);
		}

		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		try {
			setGreetMsg(await invoke("greet", { name }));
		} catch (error) {
			console.error("Failed to invoke greet:", error);
			setGreetMsg("Error invoking greet!");
		}
	}

	return (
		<main className="container">
			<h1>Welcome to Tauri + React</h1>

			<div className="row">
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" className="logo vite" alt="Vite logo" />
				</a>
				<a href="https://tauri.app" target="_blank">
					<img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<p>{answer}</p>

			<form
				className="row"
				onSubmit={(e) => {
					e.preventDefault();
					console.log(e);

					greet();
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>
			<p>{greetMsg}</p>
		</main>
	);
}

export default App;
