const { Produto } = require('../models/index');

const index = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json(err);
    }
}

const create = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json(err);
    }
}

const read = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        if (produto) res.status(200).json(produto);
        else res.status(404).json({ message: 'Produto não encontrado!' });
        
    } catch (err) {
        res.status(500).json(err);
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const [ found ] = await Produto.update(req.body, { where: { id: id } });
        
        if (found) res.status(200).json({ message: 'Produto atualizado!' });
        else res.status(404).json({ message: 'Produto não encontrado!' });

    } catch (err) {
        res.status(500).json(err);
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.destroy({ where: { id: id }});
        
        if (produto) res.status(200).json({ message: 'Produto deletado!' });
        else res.status(404).json({ message: 'Produto não encontrado!' });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { index, create, read, update, remove };