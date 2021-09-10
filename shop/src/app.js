const express = require('express');
const usersRouter = require('../src/routes/users');
const productsRouter = require('../src/routes/products');
const app = express();
const PORT = 3000

app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});