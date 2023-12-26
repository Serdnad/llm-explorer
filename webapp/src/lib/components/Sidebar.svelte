<script lang="ts">
	import { createChat, type Chat, loadChats, saveChat } from '$lib/chat'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import ChatButton from './ChatButton.svelte'

	let chats: Chat[] = []

	onMount(() => {
		chats = loadChats()
	})

	function newChat() {
		const chat = createChat('untitled')
		saveChat(chat)

		location.href = `/chats/${chat.id}`
	}
</script>

<div class="sidebar">
	<div class="new-chat">
		<button on:click={newChat}>
			<h3>New Chat</h3>
		</button>
	</div>

	{#each chats as chat}
		<ChatButton {chat} />
	{/each}
</div>

<style lang="scss">
	.sidebar {
		display: flex;
		flex-direction: column;

		position: sticky;
		min-width: 200px;
		height: 100vh;

		background: #1a1c1c;
		border-right: 1px solid #323232;
	}

	.new-chat {
		font-weight: 500;
	}

	button {
		cursor: pointer;

		background: #1c1f1f;
		border: none;
		border: 1px solid #323232;
		color: white;

		padding: 8px;
		margin: 0;

		font-weight: 400;
	}
</style>
