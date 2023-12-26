<script lang="ts">
	import type { Chat } from '$lib/chat'

	export let chat: Chat
	export let selected: boolean = false
</script>

<button
	class={selected ? 'selected' : ''}
	on:click={() => (window.location.href = `/chats/${chat.id}`)}
>
	<p>{chat.name}</p>
</button>

<style lang="scss">
	button {
		cursor: pointer;

		background: #1c1f1f;
		border: none;
		border: 1px solid #323232;
		color: white;

		padding: 8px;
		margin: 0;

		font-weight: 400;

		&.selected {
			background: #323232;
			font-weight: 600;
		}

		&:hover {
			background: #323232;
		}

		p {
			margin: 0;
			text-align: start;
		}
	}
</style>
