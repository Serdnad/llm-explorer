<script lang="ts">
	import { generateChatCompletionStream, generateCompletionStream, type ChatMessage } from '$lib'
	import ChatBubble from '$lib/components/ChatBubble.svelte'

	let out2 = ''
	let blah2: string = ''

	let messages: ChatMessage[] = []

	async function send2() {
		messages.push({
			role: 'user',
			content: blah2
		})
		messages = [...messages]

		const stream = generateChatCompletionStream(messages)
		let resp = ''
		messages.push({
			role: 'assistant',
			content: resp
		})
		for await (const item of stream) {
			if (item === undefined || '' + item == 'undefined') continue

			out2 += item
			resp += item

			messages[messages.length - 1].content = resp
		}

		out2 += '\n\n'
	}
</script>

<hr />

<div class="container">
	<div class="combo">
		<input bind:value={blah2} />
		<button on:click={send2}>do it</button>
	</div>

	<div>
		{#each messages as msg}
			<ChatBubble message={msg} />
		{/each}
	</div>
</div>

<style lang="scss">
	pre {
		background: #eee;
		padding: 1rem;
	}

	.container {
		display: flex;
		width: 100vw;
		min-height: calc(100vh - 20px);

		flex-direction: column-reverse;
	}
</style>
