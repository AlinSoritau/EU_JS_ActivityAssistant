import { Router, Request, Response } from "express";
import { MessageService } from "../services/message.service"
import { CreateMessageUsingAiDTO } from "../types/messageUsingAiDTO";
import { OpenAI } from "openai/client";

const router = Router()

const conversationService = new MessageService()

router.post('/', async (req: Request, res: Response) => {
    const data = await conversationService.createMessage(req.body)
    res.send(data)
})

router.get('/', async (req: Request, res: Response) => {
    const data = await conversationService.getMessagesAsync(req.query.conversation_id as string)
    res.send(data)
})

router.put('/', async (req: Request, res: Response) => {
    const data = await conversationService.editMessageAsync(req.body)
    res.send(data)
})

router.post('/ai', async (req: Request<{}, {}, CreateMessageUsingAiDTO>, res: Response) => {
    const data = await conversationService.createMessageUsingAI(req.body)
    res.status(201).send(data)
})

export default router