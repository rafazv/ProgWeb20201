const express = require('express');
const usersRouter = require('../src/routes/users');
const productsRouter = require('../src/routes/products');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

const PORT = 3000

app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});