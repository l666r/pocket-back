const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getChatHistory,
  getSingleChatSession,
  deleteChatSession,
  clearAllChats,
  shareChat,
  getSharedChat,
} = require('../controllers/chatController');

router.post('/', sendMessage);
router.get('/history', getChatHistory);
router.get('/session/:sessionId', getSingleChatSession);
router.delete('/:sessionId', deleteChatSession);
router.delete('/', clearAllChats);
router.post('/share', shareChat);
router.get('/share/:shareCode', getSharedChat);

module.exports = router;
