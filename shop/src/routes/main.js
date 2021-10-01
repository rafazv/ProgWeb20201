const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

router.post('/signup', mainController.signup);
router.post('/login', mainController.login);
router.post('/logout', mainController.logout);

module.exports = router;