const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos');
const upload = require('../middlewares/upload');

const authUtils = require('../utils/auth');

router.get('/', produtosController.index);
router.post('/', authUtils.verifyAuth, produtosController.create);
router.post('/:id/image', upload, (req, res) => {
    res.sendStatus(201);
});
router.get('/:id', produtosController.read);
router.put('/:id', authUtils.verifyAuth, produtosController.update);
router.delete('/:id', authUtils.verifyAuth, produtosController.remove);

module.exports = router;