import type { ChatMessage } from '$lib'

export type Chat = {
	id: string
	name: string
	messages: ChatMessage[]
	createdAt: Date
	updatedAt: Date
}

export function createChat(name: string): Chat {
	const now = new Date()
	return {
		id: now.getTime().toString(), // little hacky but works
		name,
		messages: [],
		createdAt: now,
		updatedAt: now
	}
}

export function loadChats(): Chat[] {
	return JSON.parse(localStorage.getItem('chats') ?? '[]')
}

export function saveChat(chat: Chat) {
	const chats = loadChats()
	const index = chats.findIndex((c) => c.id === chat.id)
	if (index >= 0) {
		chats[index] = chat
	} else {
		chats.push(chat)
	}

	localStorage.setItem('chats', JSON.stringify(chats))
}
