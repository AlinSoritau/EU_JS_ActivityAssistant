import { Router } from 'express';
import { AiConversationService } from '../services/aiConversation.service';

const router = Router();

const aiConversationService = new AiConversationService();

router.post('/conversation', async (req, res) => {
    try {
        const { message } = req.body;
        console.log('Received message:', message);
        const response = await aiConversationService.sendSimpleMessage(message);
        res.json(response);
    } catch (error) {
        console.error('Error processing conversation:', error);
        res.status(500).json({ error: 'Failed to process conversation' });
    }
});

export default router;