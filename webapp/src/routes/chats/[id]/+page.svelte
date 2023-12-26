<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { type Chat, loadChats, saveChat } from '$lib/chat'
	import Sidebar from '$lib/components/Sidebar.svelte'
	import ChatBubble from '$lib/components/ChatBubble.svelte'
	import InputCombo from '$lib/components/InputCombo.svelte'
	import { generateChatCompletionStream } from '$lib'

	const chatId: string = $page.params.id

	let chat: Chat

	onMount(async () => {
		const chats = await loadChats()
		chat = chats.find((chat) => chat.id === chatId)!
		console.log(chat)
	})

	async function send2(text: string) {
		chat.messages.push({
			role: 'user',
			content: text
		})
		chat.messages = [...chat.messages]

		const stream = generateChatCompletionStream(chat.messages)
		let resp = ''
		chat.messages.push({
			role: 'assistant',
			content: resp
		})
		for await (const item of stream) {
			if (item === undefined || '' + item == 'undefined') continue

			resp += item

			chat.messages[chat.messages.length - 1].content = resp
		}

		saveChat(chat)
	}
</script>

<div class="layout">
	<Sidebar />

	<div class="container">
		<div class="chat-window">
			{#if chat}
				<div>
					{#each chat.messages as msg}
						<ChatBubble message={msg} />
					{/each}
				</div>
			{/if}
		</div>

		<InputCombo onClick={send2} />
	</div>
</div>

<style lang="scss">
	.layout {
		display: flex;
	}

	.chat-window {
		flex: 1;
		max-height: calc(100vh - 51px);
		overflow-y: auto;
	}

	.container {
		flex: 1;
		min-height: 100vh;

		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: space-between;
	}
</style>
