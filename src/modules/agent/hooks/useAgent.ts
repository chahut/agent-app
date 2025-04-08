import { api } from "../../api/api.service";

export interface UseAgentProps {
	/**
	 * Id of the agent to use (e.g. "mistral-public")
	 */
	id: string;
}

export default function useAgent({ id }: UseAgentProps) {
	async function ask(
		prompt: string,
		forEachChunk: (responseChunk: string) => void,
	) {
		const { data, error } = await api
			.agent({ id })
			.ask.get({ query: { prompt } });

		if (!data || error) return;

		for await (const chunk of data) forEachChunk(`${chunk}`);
	}

	return {
		ask,
	};
}
