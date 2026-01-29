import {supabase } from "../lib/supabase";
import { CreateMessageDTO, MessageDTO } from "../types/messageDTO";

export class MessageService {
    async createMessage(message: CreateMessageDTO) {
        const {error} = await supabase
            .from("messages")
            .insert(message)

        if (error) {
            throw new Error(error.message);
        }

        return { success: true };
    }

    async getMessagesAsync(conversationId: string) : Promise<MessageDTO[]> {
        const {data, error} = await supabase
            .from("messages")
            .select("*")
            .eq("conversation_id", conversationId)
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async editMessageAsync(editedMessage: MessageDTO) {
        const { error} = await supabase.from("messages")
            .update({ text: editedMessage.text })
            .eq("id", editedMessage.id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return { success: true };
    }
}