const express = require('express');
const cookieParser = require('cookie-parser');
// const usersRouter = require('../src/routes/users');
// const productsRouter = require('../src/routes/products');
const produtosRouter = require('../src/routes/produtos');
const usuariosRouter = require('../src/routes/usuarios');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

require('dotenv').config();

const PORT = process.env.NODE_DOCKER_PORT;

app.use(express.json());
app.use(cookieParser());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((req, res, next) => {
    if(!('nome' in req.cookies)) {
        res.cookie('nome', 'usuario1');
        console.log('Cookie criado!');
    } else {
        console.log('Cookie já havia sido criado!');
        console.log(req.cookies);
    }
    
    next();
})

// app.use('/users', usersRouter);
// app.use('/products', productsRouter);

app.use('/produtos', produtosRouter);
app.use('/usuarios', usuariosRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});