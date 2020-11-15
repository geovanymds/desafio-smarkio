const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message');

router.get('/analytics', messageController.getAnalytics);
router.get('/messagesByUser', messageController.countMessagesByUser);
router.get('/messagesByIntention', messageController.countMessagesByIntention);
router.get('/countMessages', messageController.countMessages);

module.exports = router;