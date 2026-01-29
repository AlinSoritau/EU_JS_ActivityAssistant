import { Router, Request, Response } from "express";
import { ConversationService } from "../services/conversation.service"

const router = Router()

const conversationService = new ConversationService()

router.post('/', async (req: Request, res: Response) => {
    const data = await conversationService.createConversation()
    res.send(data)
})

router.delete('/', async (req: Request, res: Response) => {
    const data = await conversationService.deleteConversation(req.query.conversation_id as string)
    res.send(data)
})

export default router