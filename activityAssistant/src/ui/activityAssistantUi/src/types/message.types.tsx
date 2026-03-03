export interface Message {
    id?: number
    conversationId: string
    isUserMessage?: boolean
    text: string
    createdAt?: string
}