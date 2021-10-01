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

const read = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (usuario) res.status(200).json(usuario);
        else res.status(404).json({ message: 'Usuario não encontrado!' });
        
    } catch (err) {
        res.status(500).json(err);
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const [ found ] = await Usuario.update(req.body, { where: { id: id } });
        
        if (found) res.status(200).json({ message: 'Usuario atualizado!' });
        else res.status(404).json({ message: 'Usuario não encontrado!' });

    } catch (err) {
        res.status(500).json(err);
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.destroy({ where: { id: id }});
        
        if (usuario) res.status(200).json({ message: 'Usuario deletado!' });
        else res.status(404).json({ message: 'Usuario não encontrado!' });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { index, create, read, update, remove };