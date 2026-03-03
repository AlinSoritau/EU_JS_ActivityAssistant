import { Router } from 'express';
import { AiConversationService } from '../services/aiConversation.service';
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

const aiConversationService = new AiConversationService();

router .get('/conversations', async (req, res) => {
    try {
        authenticateToken(req, res, async () => {})
        const userId = req.query.userId as string
        const conversations = await aiConversationService.getConversationsByUserId(userId)
        res.json(conversations)
    } catch (error) {
        console.error('Error fetching conversations:', error)
        res.status(500).json({ error: 'Failed to fetch conversations' })
    }
})

router .post('/conversation', async (req, res) => {
    try {
        authenticateToken(req, res, async () => {})
        const conversationData = req.body
        console.log('Creating new conversation:', conversationData)
        const response = await aiConversationService.createNewConversation(conversationData)
        res.json(response)
    } catch (error) {
        console.error('Error creating conversation:', error)
        res.status(500).json({ error: 'Failed to create conversation' })
    }
})

router.delete('/conversation/:id', async (req, res) => {
    try {
        authenticateToken(req, res, async () => {})
        const conversationId = req.params.id
        const response = await aiConversationService.deleteConversation(conversationId)
        console.log('Deleted conversation with ID:', conversationId)
        res.json(response)
    } catch (error) {
        console.error('Error deleting conversation:', error)
        res.status(500).json({ error: 'Failed to delete conversation' })
    }
})

export default router