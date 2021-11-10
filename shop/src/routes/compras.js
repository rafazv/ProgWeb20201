const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/compras');

const authUtils = require('../utils/auth');

router.get('/usuario/:id', authUtils.verifyAuth, comprasController.index);
router.get('/usuario/itens/:id', authUtils.verifyAuth, comprasController.itensCompra);
router.post('/', authUtils.verifyAuth, comprasController.create);


module.exports = router;