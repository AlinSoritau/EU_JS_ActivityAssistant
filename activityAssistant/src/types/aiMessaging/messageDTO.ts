export interface MessageDTO {
    id?: number
    conversationId: string
    isUserMessage: boolean
    message: string
    createdAt?: string
}