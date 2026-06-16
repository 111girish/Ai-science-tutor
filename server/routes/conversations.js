import express from 'express';
import authentication from '../middleware/authentication.js';
import { deleteConvo, getConvo, postConvo } from '../controllers/conversationController.js';
const conversations = express.Router();

conversations.get('/conversations', authentication, getConvo);
conversations.post('/conversations', authentication, postConvo);
conversations.delete('/conversations/:convoId', authentication, deleteConvo);

export default conversations;