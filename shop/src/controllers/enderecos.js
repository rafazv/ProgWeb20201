const { Endereco } = require('../models/index');

const index = async (req, res) => {
    try {
        const { id } = req.params;
        const enderecos = await Endereco.findOne({ where: { usuarioId: id } });
        if (enderecos) res.status(200).json(enderecos);
        else res.status(404).json({ message: 'Usuário não possui endereço(s)!' });

    } catch (err) {
        res.status(500).json(err);
    }
}

const create = async (req, res) => {
    try {
        const endereco = await Endereco.create(req.body);
        res.status(200).json(endereco);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { create, index };