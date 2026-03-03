import { ConversationDTO } from "../types/aiMessaging/conversationDTO";
import { supabase } from "../lib/supabase";

export class AiConversationService {

    async getConversationsByUserId(userId: string) : Promise<ConversationDTO[]> {
        const { data, error } = await supabase.from("conversation").select("*").eq("userId", userId)
        
        if (error) {
            throw error
        }

        return data;
    }
    
    async createNewConversation(conversation: ConversationDTO) : Promise<string> {
        const { data, error } = await supabase.from("conversation").insert(conversation).select("conversationId").single()
        
        if (error) {
            throw error
        }
        
        return data?.conversationId
    }

    async deleteConversation(conversationId: string) {
        const { error } = await supabase.from("conversation").delete().eq("conversationId", conversationId)
        if (error) {
            throw error
        }
        return { success: true }
    }
}
