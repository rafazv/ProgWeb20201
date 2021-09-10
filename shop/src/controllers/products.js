const { uuid } = require('uuidv4');

let products = [];

const index = (req, res) => {
    return res.send(products);
}

const create = (req, res) => {
    const product = req.body;
    products.push({...product, id: uuid()});

    return res.status(201).json();
}

const read = (req, res) => {
    const { id } = req.params;
    const product = products.filter((u) => u.id == id);

    return res.send(product);
}

const update = (req, res) => {
    const { id } = req.params;
    const productId = products.findIndex((u) => u.id == id);

    if (productId == -1) return res.status(404).json({ msg: 'Produto não encontrado' });

    if (req.body.nome) products[productId].nome = req.body.nome;
    if (req.body.preco) products[productId].preco = req.body.preco;

    return res.status(200).json({ msg: 'Produto atualizado' });
}

const remove = (req, res) => {
    const { id } = req.params;

    products = products.filter((u) => u.id != id);
    return res.send(200).json({ msg: 'Produto apagado' });
}

module.exports = { index, create, read, update, remove };