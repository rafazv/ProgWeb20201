const express = require('express');
const router = express.Router();

const produtosRouter = require('./produtos');
const usuariosRouter = require('./usuarios');
const enderecosRouter = require('./enderecos');
const mainRouter = require('./main');

router.use('/produtos', produtosRouter);
router.use('/enderecos', enderecosRouter);
router.use('/usuarios', usuariosRouter);
router.use('/', mainRouter);

module.exports = router;