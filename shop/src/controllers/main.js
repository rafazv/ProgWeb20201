const bcrypt = require('bcryptjs');
const { Usuario, TipoUsuario } = require('../models');

const signup = async (req, res) => {
    try {
        const user = await Usuario.findOne({ where: { email: req.body.email } });
        if (!user) {
            bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS), (err, salt) => {
                bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                    await Usuario.create({ ...req.body, senha: hash });
                    res.status(200).json({ message: 'Usuario criado!' });
                });
            });
        } else {
            res.status(400).json({ message: 'Email já cadastrado!' });
        }

    } catch (err) {
        res.status(500).json(err.message);
    }
}

const login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { email: req.body.email }, include: TipoUsuario });

        if(usuario) {
            bcrypt.compare(req.body.senha, usuario.senha, (err, ok) => {
                if(ok) {
                    req.session.userId = usuario.id;
                    req.session.tipoUsuario = usuario.TipoUsuario.rotulo;
                    res.status(200).json({id: usuario.id, nome: usuario.nome, email: usuario.email, tipoUsuarioId: usuario.tipoUsuarioId});
                } else {
                    res.status(401).json({ message: 'Email e/ou senha inválidos' });
                }
            });
        } else {
            res.status(401).json({ message: 'Email e/ou senha inválidos' });
        }

    } catch (err) {
        res.status(500).json(err.message);
    }
}

const logout = async (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ message: 'Sessão finalizada!' });
    });
}

module.exports = { signup, login, logout }