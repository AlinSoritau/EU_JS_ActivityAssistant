export interface MessageUsingAiDTO {
    id: string;
    conversation_id: string;
    text: string | null;
    role: BigInt;
}

export interface CreateMessageUsingAiDTO {
    conversation_id: string;
    text: string | null;
    role: BigInt;
}