import type { Conversation } from '../types/conversation.types'
import axiosClient from './axiosClient'

// get conversations
export async function getConversaitons(): Promise<Conversation[]> {
    const response = await axiosClient.get('/conversation')

    return response.data
}

// create car


// update car


//delete car