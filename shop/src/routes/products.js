const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.index);
router.post('/', productsController.create);
router.get('/:id', productsController.read);
router.post('/:id', productsController.update);
router.delete('/:id', productsController.remove);

module.exports = router;