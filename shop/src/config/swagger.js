const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Shop API',
        version: '0.0.0',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            'name': 'User',
            'description': 'Endpoints'
        }
    ],
    definitions: {
        User: {
            $name: 'Jhon Doe',
            $email: 'jhon.doe@email.com',
        },
        Product: {
            $name: 'Soda',
            $price: 2,
        },
    }
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './src/routes/products.js',
  './src/routes/users.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../app')
});
