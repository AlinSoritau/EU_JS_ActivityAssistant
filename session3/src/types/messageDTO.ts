export interface MessageDTO {
    id: string;
    conversation_id: string;
    text: string | null;
    role: BigInt;
}

export interface CreateMessageDTO {
    conversation_id: string;
    text: string | null;
    role: BigInt;
}