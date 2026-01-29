import {supabase } from "../lib/supabase";

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