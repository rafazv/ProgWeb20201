const express = require('express');
const router = express.Router();
const enderecosController = require('../controllers/enderecos');

router.get('/usuario/:id', enderecosController.index);
router.post('/', enderecosController.create);


module.exports = router;