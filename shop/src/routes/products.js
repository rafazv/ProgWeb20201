const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

/*
    #swagger.description = 'List all products.'
    #swagger.tags = ['Products']
    #swagger.responses[200] = {
        description: 'Products list.',
    }
*/
router.get('/', productsController.index);

/*
    #swagger.description = 'Add new product.'
    #swagger.tags = ['Products']
    #swagger.responses[200] = {
        description: 'Product created.',
    }
*/
router.post('/', productsController.create);

/*
    #swagger.description = 'Find product by id.'
    #swagger.tags = ['Products']
    #swagger.responses[200] = {
        description: 'Product found.',
    }
*/
router.get('/:id', productsController.read);

/*
    #swagger.description = 'Update product.'
    #swagger.tags = ['Products']
    #swagger.responses[200] = {
        description: 'Product updated.',
    }
*/
router.post('/:id', productsController.update);

/*
    #swagger.description = 'Delete product.'
    #swagger.tags = ['Products']
    #swagger.responses[200] = {
        description: 'Product deleted.',
    }
*/
router.delete('/:id', productsController.remove);

module.exports = router;