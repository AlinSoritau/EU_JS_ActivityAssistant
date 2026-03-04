import { Router, Request, Response } from "express";
import { AiMessageService } from "../services/aiMessage.service"
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router()

const aiMessageService = new AiMessageService()

router.post('/', async (req: Request, res: Response) => {
    try {
        authenticateToken(req, res, async () => {})
        const conversationData = req.body
        const response = await aiMessageService.sendMessageWithConversationContext(conversationData.conversationId, conversationData.message)
        res.json(response)
    } catch (error) {
        console.error('Error sending message with conversation context:', error)
        res.status(500).json({ error: 'Failed to send message with conversation context' })
    }
})

router.post('/simpleMessage', async (req: Request, res: Response) => {
    try {
        authenticateToken(req, res, async () => {})
        const messages = await aiMessageService.sendSimpleMessage(req.body.message)
        res.json(messages)
    } catch (error) {
        console.error('Error sending simple message:', error)
        res.status(500).json({ error: 'Failed to send simple message' })
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        authenticateToken(req, res, async () => {})
        const conversationId = req.query.conversationId
        const messages = await aiMessageService.getConversationMessages(conversationId as string)
        res.json(messages)
    } catch (error) {
        console.error('Error fetching messages by conversation ID:', error)
        res.status(500).json({ error: 'Failed to fetch messages by conversation ID' })
    }
})

export default router