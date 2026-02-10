import {supabase } from "../lib/supabase";
import type { ConversationDTO } from "../types/conversationDTO";

export class ConversationService {
    async createConversation() {
        const {data, error} = await supabase
            .from("conversations")
            .insert({})
            .select()
            .single()

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async getConversations() : Promise<ConversationDTO[]> {
        const {data, error} = await supabase
            .from("conversations")
            .select("*")

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async deleteConversation(conversationId: string) {
        const {error} = await supabase
            .from("conversations")
            .delete()
            .eq("id", conversationId)
        if (error) {
            throw new Error(error.message);
        }
        return { message: "Conversation deleted successfully." }
    }
}