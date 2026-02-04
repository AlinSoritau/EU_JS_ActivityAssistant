import type { Conversation } from '../types/conversation.types'
import axiosClient from './axiosClient'

// get conversations
export async function getConversaiton(): Promise<Conversation[]> {
    const response = await axiosClient.get('/cars')

    return response.data
}

// create car


// update car


//delete car