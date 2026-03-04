export interface Message {
    id?: number
    conversationId: string
    isUserMessage?: boolean
    message: string
    createdAt?: string
}