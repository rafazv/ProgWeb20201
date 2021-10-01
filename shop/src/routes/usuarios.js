const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios');

router.get('/', usuariosController.index);
router.post('/', usuariosController.create);
router.get('/:id', usuariosController.read);
router.put('/:id', usuariosController.update);
router.delete('/:id', usuariosController.remove);


module.exports = router;