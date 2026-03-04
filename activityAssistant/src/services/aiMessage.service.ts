import { OpenAI } from "openai";
import { supabase } from "../lib/supabase";
import { MessageDTO } from "../types/aiMessaging/messageDTO";

export class AiMessageService {
    aiClient = new OpenAI({
        // apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_API_BASE_URL
    })

    async sendSimpleMessage(message: string) : Promise<any> {
        const prompt = `You are a helpful assistant. Respond to the following message: ${message}`
        
        const aiResponse = await this.aiClient.chat.completions.create({
            // model: 'gemini-2.5-flash-lite',
            model: 'qwen/qwen3-vl-4b',
            messages: [{ role: 'user', content: prompt ?? "" }],
        });
        return { message, response: aiResponse.choices[0]?.message?.content }
    }

    async sendMessageWithConversationContext(conversationId: string, text: string) : Promise<any> {
        const conversationMessages = await supabase.from("messages").select("message, isUserMessage").eq("conversationId", conversationId).order("messageId", { ascending: true })

        if (conversationMessages.error) {
            throw conversationMessages.error
        }

        const contextJson = JSON.stringify(conversationMessages.data)
        const prompt = `You are a helpful assistant.
        This is the context of the current conversation: ${contextJson}. Your messages are those where isUserMessage is false, and the user's messages are those where isUserMessage is true.
        Messages are added to the conversation in order, so the first message in the array is the oldest, and the last message is the most recent.
        Respond to the following message: ${text}.`

        const response = await this.aiClient.chat.completions.create({
            model: 'gemini-2.5-flash-lite',
            messages: [{ role: 'user', content: prompt ?? "" }],
        });

        // Save user message to database
        const { error: userMessageError } = await supabase.from("messages").insert({
            conversationId: conversationId,
            message: text,
            isUserMessage: true
        });

        // Save AI response to database
        const { error: aiMessageError } = await supabase.from("messages").insert({
            conversationId: conversationId,
            message: response.choices[0]?.message?.content ?? "",
            isUserMessage: false
        });

        if (userMessageError) {
            console.error('Error saving user message:', userMessageError)
            throw userMessageError
        }
        if (aiMessageError) {
            console.error('Error saving AI message:', aiMessageError)
            throw aiMessageError
        }
        
        return { 
                message: response.choices[0]?.message?.content ?? "",
                conversationId: conversationId,
                isUserMessage: false
        }
    }

    async getConversationMessages(conversationId: string) : Promise<MessageDTO[]> {
        const { data, error } = await supabase.from("messages").select("*").eq("conversationId", conversationId).order("messageId", { ascending: true })
        if (error) {
            console.error('Error fetching conversation messages:', error)
            throw error
        }
        
        return data as MessageDTO[]
    }
}