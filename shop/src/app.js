const express = require('express');
const routes = require('./routes');
const cors = require('cors');

// const usersRouter = require('../src/routes/users');
// const productsRouter = require('../src/routes/products');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger.json');

const { uuid } = require('uuidv4');
const session = require('express-session');
app.use(cors({ origin: 'http://localhost:3021', credentials: true }));

require('dotenv').config();
const PORT = process.env.NODE_DOCKER_PORT;

app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(session({
    genid: () => uuid(),
    secret: process.env.SESSION_SECRET,
    resave: true, 
    saveUninitialized: true,
    cookie: { expires: 86400 }
}));

app.use(routes);

app.get('/uuid', (req, res) => {
    res.send({ uuid: uuid() });
});

// app.use('/users', usersRouter);
// app.use('/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});