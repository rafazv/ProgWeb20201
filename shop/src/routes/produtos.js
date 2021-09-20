const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos');

router.get('/', produtosController.index);
router.post('/', produtosController.create);
router.get('/:id', produtosController.read);
router.put('/:id', produtosController.update);
router.delete('/:id', produtosController.remove);

module.exports = router;