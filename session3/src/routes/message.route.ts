import { Router, Request, Response } from "express";
import { MessageService } from "../services/message.service"

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

export default router