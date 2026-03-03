import { OpenAI } from "openai";

export class AiConversationService {
    aiClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_API_BASE_URL
    })

    async sendSimpleMessage(message: string) : Promise<any> {
        const prompt = `You are a helpful assistant. Respond to the following message: ${message}`;
        
        const aiResponse = await this.aiClient.chat.completions.create({
            model: 'gemini-2.5-flash-lite',
            messages: [{ role: 'user', content: prompt ?? "" }],
        });
        return { message, response: aiResponse.choices[0]?.message?.content };
    }
}
