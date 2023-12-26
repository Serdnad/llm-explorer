<script lang="ts">
	import type { ChatMessage } from '$lib'
	import * as showdown from 'showdown'

	export let message: ChatMessage

	let converter = new showdown.Converter()

	// Define a regular expression to match code blocks
	const codeBlockRegex = /(```[\s\S]*?```)/g

	// Define a function to replace code blocks with HTML
	function replaceCodeBlocks(text: string) {
		// Use the regular expression to find all code blocks in the text
		const matches = text.match(codeBlockRegex)

		// If no matches were found, return the original text
		if (!matches) {
			return text
		}

		// Loop through the matches and replace each code block with HTML
		for (const match of matches) {
			// Extract the language name from the code block
			const languageName = match.match(/```(.*?)\n/)?.[1]

			// Replace the code block with HTML <pre> and <code> elements
			text = text.replace(
				match,
				`<pre><code class="language-${languageName}">${match.slice(3, -3)}</code></pre>`
			)
		}

		// Return the modified text
		return text
	}
</script>

<div class={message.role}>
	<!-- {replaceCodeBlocks(converter.makeHtml(message.content))} -->
	{@html converter.makeHtml(message.content)}
</div>

<style lang="scss">
	div {
		padding: 16px 16px;
		background: green;
		color: white;

		margin: 16px;
		border-radius: 8px;
		box-shadow: 0 0 2px 0.5px #1a1a1acc;

		white-space: pre-wrap;

		&.user {
			background: #287789; //#rgb(30, 69, 131);
		}

		&.assistant {
			background: #288966; //rgb(13, 103, 65);
		}

		line-height: 1.5;
	}

	:global(pre) {
		display: block;
		overflow-x: scroll;

		background: black;
		border-radius: 4px;

		padding: 8px 12px;
	}

	:global(code) {
		font-family: Courier, monospace;

		background: black;
		color: white;

		padding: 1px 4px;
		border-radius: 2px;
	}

	:global(p) {
		margin: 0;
	}

	:global(ul, ol, li) {
		margin: 0;
		// padding: 0;
	}
</style>
