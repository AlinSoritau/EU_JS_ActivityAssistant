import type { Message } from '../types/message.types'
import axiosClient from './axiosClient'

export async function sendMessage(messageData: Message) {
    try {
        const response = await axiosClient.post('/ai/messages', messageData)
        return response.data
    } catch (error) {
        console.error('Error sending message:', error)
        throw error
    }
}

export async function getConversationMessages(conversationId: string) {
    try {
        const response = await axiosClient.get(`/ai/messages`, { params: { conversationId } })
        return response.data
    } catch (error) {
        console.error('Error fetching conversation messages:', error)
        throw error
    }
}