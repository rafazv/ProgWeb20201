const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

/*
    #swagger.description = 'List all users.'
    #swagger.tags = ['Users']
    #swagger.responses[200] = {
        description: 'Users list.',
    }
*/
router.get('/', usersController.index);

/*
    #swagger.description = 'Add new user.'
    #swagger.tags = ['Users']
    #swagger.responses[200] = {
        description: 'User created.',
    }
*/
router.post('/', usersController.create);

/*
    #swagger.description = 'Find user by id.'
    #swagger.tags = ['Users']
    #swagger.responses[200] = {
        description: 'User found.',
    }
*/
router.get('/:id', usersController.read);

/*
    #swagger.description = 'Update user.'
    #swagger.tags = ['Users']
    #swagger.responses[200] = {
        description: 'User updated.',
    }
*/
router.post('/:id', usersController.update);

/*
    #swagger.description = 'Delete user.'
    #swagger.tags = ['Users']
    #swagger.responses[200] = {
        description: 'User deleted.',
    }
*/
router.delete('/:id', usersController.remove);

module.exports = router;