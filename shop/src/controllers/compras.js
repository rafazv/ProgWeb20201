const { CompraItem, Compra, Produto } = require('../models/index');

const index = async (req, res) => {
    try {
        const { id } = req.params;
        const compras = await Compra.findAll({ where: { usuarioId: id } });
        if (compras) res.status(200).json(compras);
        else res.status(404).json({ message: 'Usuário não possui compra(s)!' });

    } catch (err) {
        res.status(500).json(err);
    }
}

const create = async (req, res) => {
    try {
        const compra = await Compra.create({ usuarioId: req.body.usuarioId, data: Date.now() });
        const produtoIdArr = req.body.produtoId;
        const quantidadeArr = req.body.quantidade;

        produtoIdArr.forEach(async (p, index) => {
            const compraItemObj = {
                compraId: compra.dataValues.id,
                produtoId: p,
                quantidade: quantidadeArr[index]
            }
            let produto = await Produto.findOne({ where: { id: p } });
            const estoque = produto.estoque - quantidadeArr[index];
            produto = { ...produto, estoque };
            
            await Produto.update(produto, { where: { id: p } });

            const compraItem = await CompraItem.create(compraItemObj);
            res.status(200).json(compraItem);
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

const itensCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const items = await CompraItem.findAll({ where: { compraId: id }, include: Produto });
        if (items) res.status(200).json(items);
        else res.status(404).json({ message: 'Usuário não possui compra(s)!' });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { index, create, itensCompra };