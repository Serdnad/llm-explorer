<script lang="ts">
	export let value: string = ''
	export let onClick: (text: string) => void

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			onClick(value)
		}
	}
</script>

<div on:keypress={handleKeyPress}>
	<input bind:value placeholder="Compose a message..." />
	<button on:click={() => onClick(value)}>Send</button>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: row;
		gap: 8px;

		position: sticky;
		bottom: 0;
		background: #232625;
		border-top: 1px solid #323232;

		padding: 8px 16px;

		input,
		textarea {
			flex: 1;
		}
	}

	button {
		background: #1c1f1f;
		border: none;
		border: 1px solid #323232;
		color: white;

		padding: 8px;
		margin: 0;

		font-weight: 400;
	}
</style>
