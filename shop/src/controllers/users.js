const { uuid } = require('uuidv4');

let users = [];

const index = (req, res) => {
    return res.send(users);
}

const create = (req, res) => {
    const user = req.body;
    users.push({...user, id: uuid()});

    return res.status(201).json();
}

const read = (req, res) => {
    const { id } = req.params;
    const user = users.filter((u) => u.id == id);

    return res.send(user);
}

const update = (req, res) => {
    const { id } = req.params;
    const userId = users.findIndex((u) => u.id == id);

    if (userId == -1) return res.status(404).json({ msg: 'Usuário não encontrado' });

    if (req.body.nome) users[userId].nome = req.body.nome;
    if (req.body.email) users[userId].email = req.body.email;

    return res.status(200).json({ msg: 'Usuário atualizado' });
}

const remove = (req, res) => {
    const { id } = req.params;

    users = users.filter((u) => u.id != id);
    return res.send(200).json({ msg: 'Usuário apagado' });
}

module.exports = { index, create, read, update, remove };