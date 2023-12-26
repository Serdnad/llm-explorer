import OpenAI from 'openai'

const openai = new OpenAI({
	baseURL: 'http://204.52.16.55:8000/v1',
	dangerouslyAllowBrowser: true,
	apiKey: 'NOT USED'
})

// const MODEL = 'mistralai/Mixtral-8x7B-Instruct-v0.1';
// const MODEL = 'openchat/openchat_3.5'
const MODEL = 'NousResearch/Nous-Hermes-2-Yi-34B'

export async function main() {
	const completion = await openai.completions.create({
		prompt: 'This is a test of',
		model: MODEL,
		stream: false,
		temperature: 0.1,
		max_tokens: 64
	})

	console.log(completion)
}

export async function* generateCompletionStream(prompt: string) {
	const completionStream = await openai.completions.create({
		stream: true,
		prompt: prompt,
		model: MODEL,
		temperature: 0.1,
		max_tokens: 2048
	})

	for await (const chunk of completionStream) {
		yield chunk.choices[0].text
	}
}

export type ChatMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam

export async function* generateChatCompletionStream(messages: ChatMessage[]) {
	const completionStream = await openai.chat.completions.create({
		stream: true,
		model: MODEL,
		temperature: 0.1,
		max_tokens: 2048,
		messages: messages
	})

	for await (const chunk of completionStream) {
		yield chunk.choices[0].delta.content
	}
}
