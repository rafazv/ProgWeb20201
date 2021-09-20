const express = require('express');
const usersRouter = require('../src/routes/users');
const productsRouter = require('../src/routes/products');
const produtosRouter = require('../src/routes/produtos');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

require('dotenv').config();

const PORT = process.env.NODE_DOCKER_PORT;

app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// app.use('/users', usersRouter);
// app.use('/products', productsRouter);

app.use('/produtos', produtosRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});