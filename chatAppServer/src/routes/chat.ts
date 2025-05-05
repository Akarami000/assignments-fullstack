import express, { Request, Response } from 'express';
import { askHuggingFace } from '../utils/huggingface';

const router = express.Router();
const sessionStore = new Map<string, string[]>(); // sessionId → message array

interface ChatRequestBody {
  sessionId: string;
  message: string;
}

router.post('/chat', async (req: Request<{}, {}, ChatRequestBody>, res: Response):Promise<any> => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message are required' });
  }

  const history = sessionStore.get(sessionId) || [];
  history.push(`User: ${message}`);

  const prompt = history.join('\n') + '\nBot:';

  try {
    const botReply = await askHuggingFace(prompt);
    history.push(`Bot: ${botReply}`);
    sessionStore.set(sessionId, history);

    res.json({ response: botReply, history });
  } catch (error) {
    console.error('Hugging Face error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

export default router;