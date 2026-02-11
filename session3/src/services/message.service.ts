import OpenAI from "openai";
import {supabase } from "../lib/supabase";
import { CreateMessageDTO, MessageDTO } from "../types/messageDTO";
import { CreateMessageUsingAiDTO } from "../types/messageUsingAiDTO";

export class MessageService {
    async createMessageUsingAI(message: CreateMessageUsingAiDTO) : Promise<any> {
        
        const aiClient = new OpenAI({
            apiKey: process.env.OPENAI_KEY
        })
        console.log(aiClient.requestAPIList)

        //console.log(message.text)
        //console.log(process.env.OPENAI_KEY)
        const prompt = `
        You are a chatbot on a shoe ecommerce store.
        Here is the customer message: ${message.text}.

        Suggested actions allowed are: SendEmail, AddToCart, ShowContactPhone
        Answer using this format, and always answer only regarding the shoe ecom store:
        {
            "response": "prompt response",
            "userMessage": "user prompt",
            "action": "suggested action"
        }
        `

        const response = await aiClient.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt ?? "" }]
        })

        const responseJson = JSON.parse(response.choices[0].message.content || "")

        if (Object.keys(responseJson).length > 0) {
            console.log(responseJson.action)
        }

        if (responseJson.action === "AddToCart") {
            return [
                {
                    productId: 1,
                    name: "Adidas Boost",
                    price: "$99.89"
                },
                {
                    productId: 2,
                    name: "Adidas Air Max",
                    price: "$199.89"
                }
            ]
        }

        const lifestyle = [
            "Healthy active man, age: 30-40, running everyday 5k, eating healthy.",
            "Sedentary person, age: 25, eating fast-food, never exercising."
        ]

        const prompt2 =  `
            You are an activity generator assistant, your role is to provide daily activities based.
        `

        return {
            message: message.text,
            response: response.choices[0].message.content
        };
    }
    
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