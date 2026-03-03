export interface MessageDTO {
    id?: number
    conversationId: string
    isUserMessage: boolean
    text: string
    createdAt?: string
}