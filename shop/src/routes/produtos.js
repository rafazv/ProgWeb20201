const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos');
const upload = require('../middlewares/upload');

router.get('/', produtosController.index);
router.post('/', produtosController.create);
router.post('/:id/image', upload, (req, res) => {
    res.sendStatus(201);
});
router.get('/:id', produtosController.read);
router.put('/:id', produtosController.update);
router.delete('/:id', produtosController.remove);

module.exports = router;