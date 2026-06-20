import express from 'express';
import authentication from '../middleware/authentication.js';
import { deleteConvo, getConvo, postConvo } from '../controllers/conversationController.js';
import { getMessage, postMessage } from '../controllers/messageController.js';
const conversations = express.Router();

conversations.get('/conversations', authentication, getConvo);
conversations.post('/conversations', authentication, postConvo);
conversations.delete('/conversations/:convoId', authentication, deleteConvo);
conversations.post('/conversations/:convoId/messages', authentication, postMessage);
conversations.get('/conversations/:convoId/messages', authentication, getMessage);

export default conversations;