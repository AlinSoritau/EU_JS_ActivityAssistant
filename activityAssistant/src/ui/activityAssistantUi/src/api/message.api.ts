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