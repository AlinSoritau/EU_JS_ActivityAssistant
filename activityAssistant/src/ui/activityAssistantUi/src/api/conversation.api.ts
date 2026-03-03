import type { Conversation } from '../types/conversation.types'
import axiosClient from './axiosClient'

export async function createConversation(conversationData: Conversation) {
    try {
        const response = await axiosClient.post('/ai/conversation', conversationData)
        return response.data
    } catch (error) {
        console.error('Error creating conversation:', error)
        throw error
    }
}

export async function getConversationsByUserId(userId: string) {
    try {
        const response = await axiosClient.get(`/ai/conversations?userId=${userId}`)
        return response.data
    } catch (error) {
        console.error('Error fetching conversations:', error)
        throw error
    }
}