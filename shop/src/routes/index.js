const express = require('express');
const router = express.Router();

const produtosRouter = require('./produtos');
const usuariosRouter = require('./usuarios');
const mainRouter = require('./main');

router.use('/produtos', produtosRouter);
router.use('/usuarios', usuariosRouter);
router.use('/', mainRouter);

module.exports = router;