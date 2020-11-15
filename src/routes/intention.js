const express = require('express');
const router = express.Router();
const intentionController = require('../controllers/intention');

router.get('/trendIntentions', intentionController.trendIntentions);

module.exports = router;