const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/countUsers', userController.countUsers);

module.exports = router;