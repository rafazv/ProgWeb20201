const { Usuario, TipoUsuario } = require('../models/index');

const index = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: TipoUsuario });
        res.status(200).json(usuarios);

    } catch (err) {
        res.status(500).json(err);
    }
}
const create = async (req, res) => {
    try {
        await Usuario.create(req.body);
        res.status(200).json({ message: 'Usuario criado!' });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { index, create };